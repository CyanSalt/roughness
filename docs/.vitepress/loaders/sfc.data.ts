import * as fs from 'node:fs'
import * as path from 'node:path'
import type { LVal, Node, ObjectExpression, ObjectProperty } from '@babel/types'
import type { TSFile } from '@vue-macros/api'
import { handleTSEmitsDefinition, handleTSPropsDefinition } from '@vue-macros/api'
import type { SFC } from '@vue-macros/common'
import {
  DEFINE_EMITS,
  DEFINE_OPTIONS,
  DEFINE_PROPS,
  DEFINE_SLOTS,
  isCallOf,
  isIdentifierOf,
  isLiteralType,
  MagicString,
  parseSFC,
  resolveLiteral,
} from '@vue-macros/common'
import type { Spec } from 'comment-parser'
import { parse as parseComment } from 'comment-parser'
import type { Comment, Rule } from 'postcss'
import scss from 'postcss-scss'
import { defineLoader } from 'vitepress'

const root = path.join(import.meta.dirname, '../../..')

interface Options {
  name: string | undefined,
}

interface PropLike {
  name: string,
  type: string | string[] | undefined,
  defaultValue: string | string[] | undefined,
  tags: Spec[] | undefined,
  description: string[] | undefined,
}

interface EmitLike {
  name: string,
  type: string[],
  tags: Spec[] | undefined,
  description: string[] | undefined,
}

interface CSSVar {
  name: string,
  defaultValue: string,
  tags: Spec[] | undefined,
  description: string[] | undefined,
}

export interface AnalyzeResult {
  options?: Options,
  props?: PropLike[],
  emits?: EmitLike[],
  slots?: PropLike[],
  cssVars?: CSSVar[],
}

function getDestructuringInitializer(declId: LVal | undefined, name: string) {
  const properties = declId && declId.type === 'ObjectPattern'
    ? declId.properties
    : undefined
  if (!properties) return undefined
  const property = properties.find((prop): prop is ObjectProperty => {
    return prop.type === 'ObjectProperty' && isIdentifierOf(prop.key, name)
  })
  return property && property.value.type === 'AssignmentPattern'
    ? property.value.right
    : undefined
}

function removeTrailingTokens(code: string) {
  return code.replace(/[,;]+$/g, '')
}

function getText(sourceCode: string, node: Node) {
  if (!node.loc) return undefined
  return sourceCode.slice(node.loc.start.index, node.loc.end.index)
}

function getJSDocAnnotations(node: Node) {
  if (!node.leadingComments) return undefined
  return node.leadingComments.flatMap(comment => parseComment(`/*${comment.value}*/`, {
    spacing: 'preserve',
  }))
}

function sortedBy<T extends string, U extends { [P in T]: string | number }>(key: T) {
  return (a: U, b: U) => {
    return a[key] === b[key] ? 0 : (a[key] > b[key] ? 1 : -1)
  }
}

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null
}

async function processPropsLike(options: Parameters<typeof handleTSPropsDefinition>[0]) {
  const { definitions } = await handleTSPropsDefinition(options)
  const sourceCode = options.file.content
  const declId = options.declId
  const result = Object.entries(definitions).map<PropLike>(([name, def]) => {
    const initializer = getDestructuringInitializer(declId, name)
    const annotations = def.type === 'method'
      ? def.methods.flatMap(method => getJSDocAnnotations(method.ast)).filter(nonNullable)
      : getJSDocAnnotations(def.signature.ast)
    return {
      name,
      type: def.type === 'method'
        ? def.methods.map(({ code }) => removeTrailingTokens(code))
        : (def.value ? removeTrailingTokens(def.value.code) : undefined),
      required: !def.optional,
      defaultValue: initializer ? getText(sourceCode, initializer) : undefined,
      tags: annotations?.flatMap(annotation => annotation.tags),
      description: annotations?.map(annotation => annotation.description.replace(/\[([^\]]+)\]\{@link ([^}]+)\}/g, '[$1]($2)')),
    }
  })
  return isCallOf(options.definePropsAst, DEFINE_PROPS)
    ? result.sort(sortedBy('name'))
    : result
}

async function processEmitsLike(options: Parameters<typeof handleTSEmitsDefinition>[0]) {
  const { definitions } = await handleTSEmitsDefinition(options)
  const result = Object.entries(definitions).map<EmitLike>(([name, def]) => {
    const blocks = def.flatMap(method => getJSDocAnnotations(method.ast))
    const annotations = blocks.some(nonNullable) ? blocks.filter(nonNullable) : undefined
    const nameArg = new RegExp(`(?<=\\()\\w+:\\s*(['"\`])${name}\\1(?:\\s*,\\s*)?`, 'g')
    return {
      name,
      type: def.map(({ code }) => removeTrailingTokens(code).replace(nameArg, '').replace(/\)\s*:\s*/g, ') => ')),
      tags: annotations?.flatMap(annotation => annotation.tags),
      description: annotations?.map(annotation => annotation.description.replace(/\[([^\]]+)\]\{@link ([^}]+)\}/g, '[$1]($2)')),
    }
  })
  return isCallOf(options.defineEmitsAst, DEFINE_EMITS)
    ? result.sort(sortedBy('name'))
    : result
}

function processOptions(expr: ObjectExpression): Options {
  const properties = expr.properties.filter((prop): prop is ObjectProperty => prop.type === 'ObjectProperty')
  const nameProp = properties.find(prop => isIdentifierOf(prop.key, 'name'))
  return {
    name: isLiteralType(nameProp?.value) ? resolveLiteral(nameProp.value) as string : undefined,
  }
}

function parseCssVars(sfc: SFC) {
  const cssVars: CSSVar[] = []
  for (const style of sfc.styles) {
    const ast = scss.parse(style.content)
    const rootRules = ast.nodes.filter((node): node is Rule => node.type === 'rule')
    for (const rule of rootRules) {
      let comments: Comment[] = []
      for (const node of rule.nodes) {
        if (node.type === 'comment') {
          comments.push(node)
        } else {
          const annotations = comments.length
            ? parseComment(`/**\n${comments.map(comment => ` * ${comment.text}`).join('\n')}\n */`, {
              spacing: 'preserve',
            })
            : undefined
          comments = []
          if (node.type === 'decl') {
            const matches = node.value.match(/var\((?<name>--r-[a-z-]+)\s*,\s*(?<default>[^;]+)\)/)
            if (matches && node.prop === `--R-${matches.groups!.name.slice(4)}`) {
              cssVars.push({
                name: matches.groups!.name,
                defaultValue: matches.groups!.default.replace(/--R-/g, '--r-'),
                tags: annotations?.flatMap(annotation => annotation.tags),
                description: annotations?.flatMap(annotation => annotation.description),
              })
            }
          }
        }
      }
    }
  }
  return cssVars
}

async function analyzeSFC(s: MagicString, sfc: SFC) {
  const program = sfc.getSetupAst()
  if (!program) return
  const scriptSetup = sfc.scriptSetup!
  const offset = scriptSetup.loc.start.offset
  const file: TSFile = {
    kind: 'file',
    filePath: sfc.filename,
    content: scriptSetup.content,
    ast: program.body,
  }
  const result: AnalyzeResult = {
    cssVars: parseCssVars(sfc),
  }
  for (const node of program.body) {
    if (node.type === 'ExpressionStatement') {
      // defineProps<Type>()
      if (isCallOf(node.expression, DEFINE_PROPS)) {
        const typeDeclRaw = node.expression.typeParameters?.params[0]
        if (typeDeclRaw) {
          result.props = await processPropsLike({
            s,
            file,
            sfc,
            offset,
            definePropsAst: node.expression,
            typeDeclRaw,
            statement: node,
          })
        }
      }
      if (isCallOf(node.expression, DEFINE_EMITS)) {
        const typeDeclRaw = node.expression.typeParameters?.params[0]
        if (typeDeclRaw) {
          result.emits = await processEmitsLike({
            s,
            file,
            sfc,
            offset,
            defineEmitsAst: node.expression,
            typeDeclRaw,
            statement: node,
          })
        }
      }
      if (isCallOf(node.expression, DEFINE_SLOTS)) {
        const typeDeclRaw = node.expression.typeParameters?.params[0]
        if (typeDeclRaw) {
          result.slots = await processPropsLike({
            s,
            file,
            sfc,
            offset,
            definePropsAst: node.expression,
            typeDeclRaw,
            statement: node,
          })
        }
      }
      if (isCallOf(node.expression, DEFINE_OPTIONS)) {
        const expr = node.expression.arguments[0]
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (expr && expr.type === 'ObjectExpression') {
          result.options = processOptions(expr)
        }
      }
    } else if (node.type === 'VariableDeclaration' && !node.declare) {
      // const props = defineProps<Type>()
      for (const decl of node.declarations) {
        if (isCallOf(decl.init, DEFINE_PROPS)) {
          const typeDeclRaw = decl.init.typeParameters?.params[0]
          const declId = decl.id
          if (typeDeclRaw) {
            result.props = await processPropsLike({
              s,
              file,
              sfc,
              offset: scriptSetup.loc.start.offset,
              definePropsAst: decl.init,
              typeDeclRaw,
              statement: node,
              declId,
            })
          }
        }
        if (isCallOf(decl.init, DEFINE_EMITS)) {
          const typeDeclRaw = decl.init.typeParameters?.params[0]
          if (typeDeclRaw) {
            result.emits = await processEmitsLike({
              s,
              file,
              sfc,
              offset: scriptSetup.loc.start.offset,
              defineEmitsAst: decl.init,
              typeDeclRaw,
              statement: node,
            })
          }
        }
      }
    }
  }
  return result
}

export interface DataItem {
  file: string,
  result: AnalyzeResult | undefined,
}

declare const data: DataItem[]
export { data }

export default defineLoader({
  watch: ['../../../src/**/*.vue'],
  async load(watchedFiles): Promise<DataItem[]> {
    return Promise.all(watchedFiles.map(async file => {
      const code = await fs.promises.readFile(file, 'utf8')
      const s = new MagicString(code)
      const sfc = parseSFC(code, file)
      const result = await analyzeSFC(s, sfc)
      return {
        file: path.relative(root, file),
        result,
      }
    }))
  },
})

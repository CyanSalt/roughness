import type { ArrayExpression, CallExpression, ExportDefaultDeclaration, ExpressionStatement, ObjectExpression, TSTypeLiteral } from '@babel/types'
import type { SFC } from '@vue-macros/common'
import { DEFINE_EMITS, DEFINE_OPTIONS, DEFINE_PROPS, isCallOf, resolveObjectExpression } from '@vue-macros/common'

export function getOptions(sfc: SFC) {
  const scriptSetup = sfc.getSetupAst()
  if (scriptSetup) {
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    const defineOptions = scriptSetup.body.find((node): node is ExpressionStatement & {
      expression: CallExpression,
    } => {
      return node.type === 'ExpressionStatement'
        && isCallOf(node.expression, DEFINE_OPTIONS)
    })?.expression
    if (defineOptions) {
      const optionsObject = defineOptions.arguments[0]
      return optionsObject.type === 'ObjectExpression'
        ? resolveObjectExpression(optionsObject)
        : undefined
    }
  }
  const script = sfc.getScriptAst()
  if (script) {
    const defaultExport = script.body.find((node): node is ExportDefaultDeclaration => {
      return node.type === 'ExportDefaultDeclaration'
    })?.declaration
    if (defaultExport) {
      const optionsObject = defaultExport.type === 'CallExpression'
        ? defaultExport.arguments[0]
        : defaultExport
      return optionsObject.type === 'ObjectExpression'
        ? resolveObjectExpression(optionsObject)
        : undefined
    }
  }
  return undefined
}

export function getProps(sfc: SFC) {
  const scriptSetup = sfc.getSetupAst()
  if (scriptSetup) {
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    const defineProps = scriptSetup.body.find((node): node is ExpressionStatement & {
      expression: CallExpression,
    } => {
      return node.type === 'ExpressionStatement'
        && isCallOf(node.expression, DEFINE_PROPS)
    })?.expression
    if (defineProps) {
      if (defineProps.typeParameters?.params.length && defineProps.typeParameters.params[0].type === 'TSTypeLiteral') {
        return defineProps.typeParameters.params[0]
      } else if (defineProps.arguments.length) {
        const propsDefinition = defineProps.arguments[0]
        if (propsDefinition.type === 'ObjectExpression' || propsDefinition.type === 'ArrayExpression') {
          return propsDefinition
        }
      }
    }
  }
  const options = getOptions(sfc)
  const props = options?.props
  if (props?.type === 'ObjectProperty') {
    const propsDefinition = props.value
    if (propsDefinition.type === 'ObjectExpression' || propsDefinition.type === 'ArrayExpression') {
      return propsDefinition
    }
  }
  return undefined
}

export function getEvents(sfc: SFC) {
  const scriptSetup = sfc.getSetupAst()
  if (scriptSetup) {
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    const defineEmits = scriptSetup.body.find((node): node is ExpressionStatement & {
      expression: CallExpression,
    } => {
      return node.type === 'ExpressionStatement'
        && isCallOf(node.expression, DEFINE_EMITS)
    })?.expression
    if (defineEmits) {
      if (defineEmits.typeParameters?.params.length && defineEmits.typeParameters.params[0].type === 'TSTypeLiteral') {
        return defineEmits.typeParameters.params[0]
      } else if (defineEmits.arguments.length) {
        const emitsDefinition = defineEmits.arguments[0]
        if (emitsDefinition.type === 'ObjectExpression' || emitsDefinition.type === 'ArrayExpression') {
          return emitsDefinition
        }
      }
    }
  }
  const options = getOptions(sfc)
  const emits = options?.emits
  if (emits?.type === 'ObjectProperty') {
    const emitsDefinition = emits.value
    if (emitsDefinition.type === 'ObjectExpression' || emitsDefinition.type === 'ArrayExpression') {
      return emitsDefinition
    }
  }
  return undefined
}

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export function getMembers(defs: ArrayExpression | ObjectExpression | TSTypeLiteral | undefined) {
  switch (defs?.type) {
    case 'TSTypeLiteral':
      return defs.members
    case 'ObjectExpression':
      return defs.properties
    case 'ArrayExpression':
      return defs.elements.filter(item => item !== null)
    default:
      return []
  }
}

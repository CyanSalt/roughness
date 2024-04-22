import type { Spec } from 'comment-parser'
import { parse as parseComment } from 'comment-parser'
import type { Comment, Node } from 'postcss'
import scss from 'postcss-scss'

export interface CSSVar {
  name: string,
  defaultValue: string,
  tags: Spec[] | undefined,
  description: string[] | undefined,
}

export interface Result {
  cssVars: CSSVar[],
}

function getLeadingComments(node: Node) {
  let comments: Comment[] = []
  for (let current = node.prev(); current?.type === 'comment'; current = current.prev()) {
    comments.unshift(current)
  }
  return comments
}

export function parse(code: string): Result {
  const cssVars: CSSVar[] = []
  const ast = scss.parse(code)
  ast.walkDecls(decl => {
    const comments = getLeadingComments(decl)
    const annotations = comments.length
      ? parseComment(`/**\n${comments.map(comment => ` * ${comment.text}`).join('\n')}\n */`, {
        spacing: 'preserve',
      })
      : undefined
    if (decl.prop.startsWith('--')) {
      cssVars.push({
        name: decl.prop,
        defaultValue: decl.value,
        tags: annotations?.flatMap(annotation => annotation.tags),
        description: annotations?.flatMap(annotation => annotation.description),
      })
    }
  })
  return {
    cssVars,
  }
}

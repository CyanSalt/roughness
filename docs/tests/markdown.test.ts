import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseSFC } from '@vue-macros/common'
import { ESLint } from 'eslint'
import fastglob from 'fast-glob'
import lineColumn from 'line-column'
import MagicString from 'magic-string'
import markdownit from 'markdown-it'
import { describe, expect, it } from 'vitest'
import { lintMarkdownVueCode } from './utils/markdown'

describe('markdown', { timeout: Infinity }, async () => {

  const dirname = path.dirname(fileURLToPath(import.meta.url))
  const markdownFiles = await fastglob(['../components/*.md'], {
    absolute: true,
    cwd: dirname,
  })
  const mdit = markdownit()
  const documents = await Promise.all(
    markdownFiles.map(async file => {
      const content = await fs.promises.readFile(file, 'utf8')
      const magicString = new MagicString(content)
      const finder = lineColumn(content)
      const tokens = mdit.parse(content, {})
      return {
        file,
        magicString,
        finder,
        tokens,
      }
    }),
  )
  const tempDir = path.join(dirname, 'cache')

  it('should be valid Vue SFC code in vue code block', async () => {
    const eslint = new ESLint({
      ignore: false,
    })
    for (const { file, magicString, finder, tokens } of documents) {
      const vueCodeBlocks = tokens.filter(token => token.type === 'fence' && token.info === 'vue')
      for (const token of vueCodeBlocks) {
        expect(() => parseSFC(token.content, `${file}.vue`), file).not.toThrowError()
        await expect(lintMarkdownVueCode({
          eslint,
          token,
          file,
          magicString,
          finder,
          tempDir,
        }), file).resolves.toEqual([])
      }
    }
  })

})

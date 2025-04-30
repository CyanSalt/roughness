import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import type { ESLint } from 'eslint'
import type lineColumn from 'line-column'
import MagicString from 'magic-string'
import type { Token } from 'markdown-it'

function sha1(text: string) {
  return crypto.createHash('sha1').update(text).digest('hex')
}

async function readJSONArray(file: string) {
  try {
    const content = await fs.promises.readFile(file, 'utf8')
    const data = JSON.parse(content)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

type LineColumnFinder = ReturnType<typeof lineColumn>

function outputFixes(code: string, messages: ESLint.LintResult['messages']) {
  let unfixable: typeof messages = []
  let isFixed = false
  const ms = new MagicString(code)
  for (const message of messages) {
    const { fix } = message
    if (fix) {
      try {
        if (fix.range[0] === fix.range[1]) {
          ms.appendLeft(fix.range[0], fix.text)
        } else {
          ms.update(fix.range[0], fix.range[1], fix.text)
        }
        isFixed = true
      } catch {
        unfixable.push(message)
      }
    } else {
      unfixable.push(message)
    }
  }
  return {
    isFixed,
    fixedCode: ms.toString(),
    unfixable,
  }
}

export async function lintMarkdownVueCode(options: {
  code?: string,
  eslint: ESLint,
  token: Token,
  file: string,
  magicString: MagicString,
  finder: LineColumnFinder,
  tempDir: string,
}) {
  let {
    code,
    eslint,
    token,
    file,
    magicString,
    finder,
    tempDir,
  } = options
  code ??= token.content
  await fs.promises.mkdir(tempDir, { recursive: true })
  const cachePath = path.join(tempDir, '.lint.json')
  const cache = await readJSONArray(cachePath)
  const hash = sha1(code)
  if (cache.includes(hash)) return []
  const filePath = path.join(tempDir, 'lint.vue')
  await fs.promises.writeFile(filePath, code)
  const result = await eslint.lintText(code, { filePath })
  let messages = result.flatMap(item => item.messages)
  if (token.map) {
    // FIXME: `outputFixes` seems not work
    // await ESLint.outputFixes(result);
    const {
      isFixed,
      fixedCode,
      unfixable,
    } = outputFixes(code, messages)
    if (isFixed) {
      return lintMarkdownVueCode({ ...options, code: fixedCode })
    }
    messages = unfixable
    if (code !== token.content) {
      const tokenText = token.type === 'fence'
        ? `${token.markup}${token.info}\n${code}${token.markup}\n`
        : code
      magicString.update(
        finder.toIndex({ line: token.map[0] + 1, column: 1 }),
        finder.toIndex({ line: token.map[1] + 1, column: 1 }),
        tokenText,
      )
      await fs.promises.writeFile(file, magicString.toString())
    }
  }
  if (!messages.length) {
    await fs.promises.writeFile(cachePath, JSON.stringify(cache.concat(hash)) + '\n')
  }
  return messages.map(message => {
    return {
      file: token.map ? `${file}:${token.map[0] + 1 + message.line}:${message.column}` : file,
      message: message.message,
      ruleId: message.ruleId,
    }
  })
}

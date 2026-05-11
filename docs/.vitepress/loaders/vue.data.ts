import * as fs from 'node:fs'
import * as path from 'node:path'
import { defineLoader } from 'vitepress'
import type { Result } from '../parsers/vue'
import { parse } from '../parsers/vue'

const root = path.join(import.meta.dirname, '../../..')
const docs = path.join(root, 'docs')

export interface DataItem {
  file: string,
  result: Result | undefined,
}

declare const data: DataItem[]
export { data }

export default defineLoader({
  watch: ['../../../src/**/*.vue'],
  async load(watchedFiles): Promise<DataItem[]> {
    return Promise.all(watchedFiles.map(async file => {
      const source = path.join(docs, file)
      const code = await fs.promises.readFile(source, 'utf8')
      const result = await parse(code, source)
      return {
        file: path.relative(root, source),
        result,
      }
    }))
  },
})

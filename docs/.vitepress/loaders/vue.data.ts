import * as fs from 'node:fs'
import * as path from 'node:path'
import { defineLoader } from 'vitepress'
import type { Result } from '../parsers/vue'
import { parse } from '../parsers/vue'

const root = path.join(import.meta.dirname, '../../..')

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
      const code = await fs.promises.readFile(file, 'utf8')
      const result = await parse(code, file)
      return {
        file: path.relative(root, file),
        result,
      }
    }))
  },
})

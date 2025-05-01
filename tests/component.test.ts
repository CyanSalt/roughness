import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Literal, ObjectProperty } from '@babel/types'
import { parseSFC, resolveLiteral } from '@vue-macros/common'
import fastglob from 'fast-glob'
import { describe, expect, it } from 'vitest'
import { getEvents, getMembers, getOptions, getProps } from './utils/vue'

describe('component', async () => {

  const dirname = path.dirname(fileURLToPath(import.meta.url))
  const vueFiles = await fastglob(['../src/**/*.vue'], {
    absolute: true,
    cwd: dirname,
  })
  const components = await Promise.all(
    vueFiles.map(async file => {
      const content = await fs.promises.readFile(file, 'utf8')
      const sfc = parseSFC(content, file)
      return sfc
    }),
  )

  it('should define component name in each Vue SFC file', () => {
    for (const sfc of components) {
      const options = getOptions(sfc)!
      expect(options, sfc.filename).toBeTruthy()
      expect(options, sfc.filename).toHaveProperty('name')
      const name = (options.name as ObjectProperty).value as Literal
      expect(name.type, sfc.filename).toEqual(expect.stringMatching(/Literal$/))
      expect(resolveLiteral(name), sfc.filename).toEqual(expect.stringMatching(/^R[A-Z].*$/))
    }
  })

  it('should import base style to ensure variables', () => {
    const baseStyleImports = expect.objectContaining({
      source: expect.objectContaining({
        value: expect.stringMatching(/\/style.scss$/),
      }),
    })
    for (const sfc of components) {
      if (sfc.styles.some(style => /\bvar\(\s*--r-common-/.test(style.content))) {
        const scriptSetup = sfc.getSetupAst()
        const script = sfc.getScriptAst()
        // Prefer using script setup imports
        if (scriptSetup) {
          expect(scriptSetup.body[0], sfc.filename).toEqual(baseStyleImports)
        } else if (script) {
          expect(script.body[0], sfc.filename).toEqual(baseStyleImports)
        }
      }
    }
  })

  it('should add JSDoc for each prop or event', () => {
    for (const sfc of components) {
      const props = getProps(sfc)
      for (const prop of getMembers(props)) {
        expect(prop.leadingComments, sfc.filename).toEqual(
          expect.arrayContaining([
            expect.anything(),
          ]),
        )
      }
      const events = getEvents(sfc)
      for (const event of getMembers(events)) {
        expect(event.leadingComments, sfc.filename).toEqual(
          expect.arrayContaining([
            expect.anything(),
          ]),
        )
      }
    }
  })

  it('should not contain scoped styles', () => {
    for (const sfc of components) {
      expect(sfc.styles, sfc.filename).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({ scoped: true }),
        ]),
      )
    }
  })

})

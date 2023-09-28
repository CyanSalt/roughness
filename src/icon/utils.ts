import { kebabCase } from 'lodash-es'
import { reactive } from 'vue'

type SVGProps = Record<string, string | number>
type IconNodeChild = readonly [tag: string, attrs: SVGProps]
export type IconNode = readonly [tag: string, attrs: SVGProps, children?: IconNodeChild[]]

const definedIcons = reactive<Record<string, IconNode>>({})

export function defineIcons(icons: Record<string, IconNode>) {
  Object.assign(definedIcons, Object.fromEntries(
    Object.entries(icons).map(([name, value]) => [kebabCase(name), value]),
  ))
}

export function useIcons() {
  return definedIcons
}

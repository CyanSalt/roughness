type SVGProps = Record<string, string | number>
type IconNodeChild = readonly [tag: string, attrs: SVGProps]
export type IconNode = readonly [tag: string, attrs: SVGProps, children?: IconNodeChild[]]

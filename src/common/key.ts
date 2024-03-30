export const RKey = Symbol('RKey')

export interface RValue {
  [RKey]: string | number,
}

export type RValueOrKey = string | number | RValue

export function keyOf(value: RValueOrKey) {
  return String(
    typeof value === 'string' || typeof value === 'number'
      ? value
      : value[RKey],
  )
}

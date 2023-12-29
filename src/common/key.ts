export const RKey = Symbol('RKey')

export interface RValue {
  [RKey]: string | number,
}

export function keyOf(value: string | number | RValue) {
  return String(
    typeof value === 'string' || typeof value === 'number'
      ? value
      : value[RKey],
  )
}

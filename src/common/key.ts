export const RKey = Symbol('RKey')

export interface RValue {
  [RKey]: string | number,
}

export function keyOf(value: unknown) {
  return String(
    typeof value === 'string' || typeof value === 'number'
      ? value
      : (value as RValue)[RKey],
  )
}

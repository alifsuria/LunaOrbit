import { isPlainObject } from "./isPlainObject.js"

export function merge(target, source) {
  const result = { ...target }

  for (const key in source) {
    const a = target[key]
    const b = source[key]

    if (isPlainObject(a) && isPlainObject(b)) {
      result[key] = merge(a, b)
    } else {
      result[key] = b
    }
  }

  return result
}

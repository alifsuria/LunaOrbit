import { isPlainObject } from "./isPlainObject.js"

export function cloneDeep(value) {
  if (Array.isArray(value)) {
    return value.map(cloneDeep)
  }

  if (isPlainObject(value)) {
    const result = {}
    for (const key in value) {
      result[key] = cloneDeep(value[key])
    }
    return result
  }

  return value
}

export function get(obj, path, defaultValue) {
  if (obj == null) return defaultValue

  const keys = Array.isArray(path)
    ? path
    : path.split(".").filter(Boolean)

  let result = obj

  for (const key of keys) {
    if (result == null) return defaultValue
    result = result[key]
  }

  return result === undefined ? defaultValue : result
}

function isPlainObject(value) {
  if (Object.prototype.toString.call(value) !== "[object Object]") {
    return false
  }

  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype
}

function cloneDeep(value) {
  if (Array.isArray(value)) {
    return value.map(cloneDeep)
  }

  if (isPlainObject(value)) {
    const result = {};
    for (const key in value) {
      result[key] = cloneDeep(value[key]);
    }
    return result
  }

  return value
}

function merge(target, source) {
  const result = { ...target };

  for (const key in source) {
    const a = target[key];
    const b = source[key];

    if (isPlainObject(a) && isPlainObject(b)) {
      result[key] = merge(a, b);
    } else {
      result[key] = b;
    }
  }

  return result
}

function get(obj, path, defaultValue) {
  if (obj == null) return defaultValue

  const keys = Array.isArray(path)
    ? path
    : path.split(".").filter(Boolean);

  let result = obj;

  for (const key of keys) {
    if (result == null) return defaultValue
    result = result[key];
  }

  return result === undefined ? defaultValue : result
}

export { cloneDeep, get, isPlainObject, merge };

function createLogger(namespace, options = {}) {
  const levels = ["debug", "info", "warn", "error"];
  const level = options.level || "info";
  const minLevelIndex = levels.indexOf(level);

  function log(type, args) {
    if (levels.indexOf(type) < minLevelIndex) return
    console[type](`[${namespace}]`, ...args);
  }

  return {
    debug: (...args) => log("debug", args),
    info: (...args) => log("info", args),
    warn: (...args) => log("warn", args),
    error: (...args) => log("error", args)
  }
}

export { createLogger };

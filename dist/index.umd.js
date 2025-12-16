(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.CoreKit = {}));
})(this, (function (exports) { 'use strict';

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

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  function timeout(promise, ms) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error("Timeout"));
      }, ms);

      promise.then(
        value => {
          clearTimeout(timer);
          resolve(value);
        },
        err => {
          clearTimeout(timer);
          reject(err);
        }
      );
    })
  }

  async function retry(fn, options = {}) {
    const {
      retries = 3,
      delay = 0,
      onRetry
    } = options;

    let lastError;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await fn()
      } catch (err) {
        lastError = err;
        if (attempt < retries) {
          if (onRetry) onRetry(err, attempt);
          if (delay > 0) {
            await new Promise(r => setTimeout(r, delay));
          }
        }
      }
    }

    throw lastError
  }

  function createQueue(concurrency = 1) {
    let active = 0;
    const queue = [];

    const next = () => {
      if (active >= concurrency || queue.length === 0) return

      const { fn, resolve, reject } = queue.shift();
      active++;

      fn()
        .then(resolve, reject)
        .finally(() => {
          active--;
          next();
        });
    };

    return function enqueue(fn) {
      return new Promise((resolve, reject) => {
        queue.push({ fn, resolve, reject });
        next();
      })
    }
  }

  function createEmitter() {
    const events = new Map();

    return {
      on(event, fn) {
        const list = events.get(event) || [];
        list.push(fn);
        events.set(event, list);
        return () => this.off(event, fn);
      },

      off(event, fn) {
        const list = events.get(event);
        if (!list) return;
        const i = list.indexOf(fn);
        if (i !== -1) list.splice(i, 1);
      },

      emit(event, payload) {
        const list = events.get(event);
        if (!list) return;
        list.forEach((fn) => fn(payload));
      },
    };
  }

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

  exports.cloneDeep = cloneDeep;
  exports.createEmitter = createEmitter;
  exports.createLogger = createLogger;
  exports.createQueue = createQueue;
  exports.get = get;
  exports.isPlainObject = isPlainObject;
  exports.merge = merge;
  exports.retry = retry;
  exports.sleep = sleep;
  exports.timeout = timeout;

}));

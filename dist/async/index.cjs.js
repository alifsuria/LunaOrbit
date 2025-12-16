'use strict';

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

exports.createQueue = createQueue;
exports.retry = retry;
exports.sleep = sleep;
exports.timeout = timeout;

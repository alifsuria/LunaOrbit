export async function retry(fn, options = {}) {
  const {
    retries = 3,
    delay = 0,
    onRetry
  } = options

  let lastError

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err
      if (attempt < retries) {
        if (onRetry) onRetry(err, attempt)
        if (delay > 0) {
          await new Promise(r => setTimeout(r, delay))
        }
      }
    }
  }

  throw lastError
}

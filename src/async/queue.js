export function createQueue(concurrency = 1) {
  let active = 0
  const queue = []

  const next = () => {
    if (active >= concurrency || queue.length === 0) return

    const { fn, resolve, reject } = queue.shift()
    active++

    fn()
      .then(resolve, reject)
      .finally(() => {
        active--
        next()
      })
  }

  return function enqueue(fn) {
    return new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject })
      next()
    })
  }
}

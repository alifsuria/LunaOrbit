import test from "node:test"
import assert from "node:assert"
import { createQueue } from "../../src/async/queue.js"

test("queue respects concurrency", async () => {
  const enqueue = createQueue(1)
  let running = 0
  let maxRunning = 0

  const task = async () => {
    running++
    maxRunning = Math.max(maxRunning, running)
    await new Promise(r => setTimeout(r, 50))
    running--
  }

  await Promise.all([
    enqueue(task),
    enqueue(task),
    enqueue(task)
  ])

  assert.equal(maxRunning, 1)
})

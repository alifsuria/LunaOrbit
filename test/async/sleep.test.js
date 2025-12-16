import test from "node:test"
import assert from "node:assert"
import { sleep } from "../../src/async/sleep.js"

test("sleep waits at least given time", async () => {
  const start = Date.now()
  await sleep(100)
  const elapsed = Date.now() - start

  assert.ok(elapsed >= 100)
})

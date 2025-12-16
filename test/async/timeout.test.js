import test from "node:test"
import assert from "node:assert"
import { timeout } from "../../src/async/timeout.js"

test("timeout resolves before limit", async () => {
  const result = await timeout(
    Promise.resolve("ok"),
    100
  )

  assert.equal(result, "ok")
})

test("timeout rejects after limit", async () => {
  await assert.rejects(
    () => timeout(new Promise(() => {}), 50),
    /Timeout/
  )
})

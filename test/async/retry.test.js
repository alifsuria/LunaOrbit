import test from "node:test"
import assert from "node:assert"
import { retry } from "../../src/async/retry.js"

test("retry succeeds after failures", async () => {
  let attempts = 0

  const result = await retry(() => {
    attempts++
    if (attempts < 3) throw new Error("fail")
    return "success"
  }, { retries: 3 })

  assert.equal(result, "success")
  assert.equal(attempts, 3)
})

test("retry throws after max retries", async () => {
  let attempts = 0

  await assert.rejects(() =>
    retry(() => {
      attempts++
      throw new Error("fail")
    }, { retries: 2 })
  )

  assert.equal(attempts, 3)
})

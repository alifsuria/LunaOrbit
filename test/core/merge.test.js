import test from "node:test"
import assert from "node:assert"
import { merge } from "../../src/core/merge.js"

test("deep merges objects", () => {
  const a = { x: { y: 1 } }
  const b = { x: { z: 2 } }

  const result = merge(a, b)

  assert.deepEqual(result, {
    x: { y: 1, z: 2 }
  })
})

test("does not mutate inputs", () => {
  const a = { x: 1 }
  merge(a, { x: 2 })
  assert.equal(a.x, 1)
})

import test from "node:test"
import assert from "node:assert"
import { cloneDeep } from "../../src/core/cloneDeep.js"

test("deep clones objects", () => {
  const original = { a: { b: 1 } }
  const cloned = cloneDeep(original)

  cloned.a.b = 2
  assert.equal(original.a.b, 1)
})

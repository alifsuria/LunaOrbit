import test from "node:test"
import assert from "node:assert"
import { isPlainObject } from "../../src/core/isPlainObject.js"

test("detects plain objects", () => {
  assert.equal(isPlainObject({}), true)
  assert.equal(isPlainObject(Object.create(null)), true)
})

test("rejects non-plain objects", () => {
  assert.equal(isPlainObject([]), false)
  assert.equal(isPlainObject(new Date()), false)
  assert.equal(isPlainObject(null), false)
})

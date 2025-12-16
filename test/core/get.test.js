import test from "node:test"
import assert from "node:assert"
import { get } from "../../src/core/get.js"

test("gets nested value", () => {
  const obj = { a: { b: { c: 1 } } }
  assert.equal(get(obj, "a.b.c"), 1)
})

test("returns default if missing", () => {
  assert.equal(get({}, "a.b.c", "x"), "x")
})

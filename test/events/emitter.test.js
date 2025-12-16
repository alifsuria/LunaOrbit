import test from "node:test"
import assert from "node:assert"
import { createEmitter } from "../../src/events/emitter.js"

test("emitter calls listeners", () => {
  const bus = createEmitter()
  let called = false

  bus.on("test", value => {
    called = value
  })

  bus.emit("test", true)
  assert.equal(called, true)
})

test("off removes listener", () => {
  const bus = createEmitter()
  let count = 0

  const fn = () => count++
  bus.on("test", fn)
  bus.off("test", fn)

  bus.emit("test")
  assert.equal(count, 0)
})

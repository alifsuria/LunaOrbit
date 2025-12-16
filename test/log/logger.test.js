import test from "node:test"
import assert from "node:assert"
import { createLogger } from "../../src/log/logger.js"

test("logger respects log level", () => {
  const logs = []
  const original = console.info

  console.info = (...args) => logs.push(args)

  const log = createLogger("test", { level: "info" })
  log.debug("nope")
  log.info("yes")

  console.info = original

  assert.equal(logs.length, 1)
})

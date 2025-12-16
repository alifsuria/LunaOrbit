# LunaOrbit

A small, framework-agnostic JavaScript utility library.

## Why lunaorbit?
- Zero dependencies
- Works in browser and Node
- No framework lock-in
- Predictable APIs

## Installation
npm install lunaorbit

## Quick Example
import { retry } from "lunaorbit/async"

await retry(() => fetch(url), { retries: 3 })

## Modules
- core
- async
- events
- log

## Philosophy
(Add your design rules here)

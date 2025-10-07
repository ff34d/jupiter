import { createDefaultEsmPreset } from "ts-jest"

const tsJestTransformCfg = createDefaultEsmPreset().transform

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "jsdom",
  transform: {
    ...tsJestTransformCfg,
  },
}

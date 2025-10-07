import { useState } from "../hooks"
import { ReactiveService } from "../lib"
import { IReactiveService } from "../models"

describe("[ReactiveService]: use case", () => {
  let reactiveService: IReactiveService

  beforeAll(() => {
    reactiveService = new ReactiveService()
  })

  it("Should create store for primitive number value and increment him", () => {
    const store = reactiveService.createStore(0)
    store.value++
    expect(store.value).toEqual(1)
  })

  it("Should subscribe effect for reactive value for primitive number value", () => {
    const store = reactiveService.createStore(0)
    let flag = false

    reactiveService.subscribe(() => (flag = true))

    store.value++
    expect(flag).toBeTruthy()
  })
})

describe("[ReactiveService]: hooks", () => {
  it("Should create state for useState and subscribe", () => {
    const state = useState(0)
    let flag = false

    state.meta.subscribe((key, value) => {
      expect(key).toEqual("value")
      expect(value).toEqual(1)
      flag = true
    })

    state.value++

    expect(flag).toBeTruthy()
  })
})

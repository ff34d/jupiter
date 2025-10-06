import { ReactiveService } from "../lib"

export function proxy<T>(value: T) {
  const reactive = new ReactiveService()
  const state = reactive.createStore<T>(value)
  return state
}

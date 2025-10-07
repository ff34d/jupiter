import { ReactiveService } from "../lib"
import { ReactiveProxy } from "../models"

export function useState<T>(value: T): ReactiveProxy<T> {
  const reactive = new ReactiveService()
  const state = reactive.createStore<T>(value)
  return state
}

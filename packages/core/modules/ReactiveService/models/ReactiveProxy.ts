import { ReactiveListener } from "./ReactiveListener"

export interface ReactiveProxy<T> {
  value: T
  meta: {
    subscribe: (fn: ReactiveListener) => VoidFunction
  }
}

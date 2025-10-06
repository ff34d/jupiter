import { ReactiveProxy } from "./ReactiveProxy"

export type ReactiveBindingFlag = "source"

export interface ReactiveBinding<T = unknown, B = any> {
  source: ReactiveProxy<T>
  isSubscribed?: boolean
  get: (s: ReactiveProxy<T>) => B
}

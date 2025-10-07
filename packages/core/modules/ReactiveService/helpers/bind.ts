import { ReactiveBinding, ReactiveProxy } from "../models"

export function bind<T>(
  source: ReactiveProxy<T>,
  get: (s: ReactiveProxy<T>) => Partial<T>
): ReactiveBinding<T> {
  return {
    source,
    get,
    isSubscribed: false,
  }
}

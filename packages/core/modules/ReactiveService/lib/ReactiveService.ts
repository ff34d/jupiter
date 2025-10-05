import { IReactiveService, ReactiveListener, ReactiveProxy } from "../models"

export class ReactiveService implements IReactiveService {
  readonly displayName = "reactive-service"
  #listeners = new Set<ReactiveListener>()

  subscribe(fn: ReactiveListener): VoidFunction {
    this.#listeners.add(fn)
    return () => this.#listeners.delete(fn)
  }

  createStore<T>(value: T): ReactiveProxy<T> {
    const box = { value }

    return new Proxy(box, {
      get(target, key) {
        return target[key as keyof typeof box]
      },

      set: (target, key, val) => {
        target[key as keyof typeof box] = val
        this.#notify(key, val)
        return true
      },
    })
  }

  #notify(key: string | symbol, value: unknown): void {
    this.#listeners.forEach((fn) => fn(key, value))
  }
}

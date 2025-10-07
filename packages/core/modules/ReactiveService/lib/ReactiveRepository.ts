import { IReactiveRepository, ReactiveListener } from "../models"

export class ReactiveRepository implements IReactiveRepository {
  #listeners = new Set<ReactiveListener>()

  subscribe(fn: ReactiveListener): VoidFunction {
    this.#listeners.add(fn)
    return () => this.#listeners.delete(fn)
  }

  notify(key: string | symbol, value: unknown): void {
    this.#listeners.forEach((fn) => fn(key, value))
  }
}

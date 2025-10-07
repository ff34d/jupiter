import { IReactiveRepository, IReactiveService, ReactiveListener, ReactiveProxy } from "../models"
import { ReactiveRepository } from "./ReactiveRepository"

export class ReactiveService implements IReactiveService {
  readonly displayName = "reactive-service"
  readonly #reactiveRepository: IReactiveRepository

  constructor() {
    this.#reactiveRepository = new ReactiveRepository()
  }

  subscribe(fn: ReactiveListener): VoidFunction {
    return this.#reactiveRepository.subscribe(fn)
  }

  createStore<T>(value: T): ReactiveProxy<T> {
    const box: ReactiveProxy<T> = { value, meta: { subscribe: this.subscribe.bind(this) } }

    return new Proxy(box, {
      get(target, key) {
        return target[key as keyof typeof box]
      },

      set: (target, key, val) => {
        target[key as keyof typeof box] = val
        this.#reactiveRepository.notify(key, val)
        return true
      },
    })
  }
}

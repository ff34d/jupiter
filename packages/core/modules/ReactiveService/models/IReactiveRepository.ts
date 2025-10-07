import { ReactiveListener } from "./ReactiveListener"

export interface IReactiveRepository {
  subscribe(fn: ReactiveListener): VoidFunction
  notify(key: string | symbol, value: unknown): void
}

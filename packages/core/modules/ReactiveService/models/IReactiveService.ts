import { IModule } from "../../../models"
import { ReactiveListener } from "./ReactiveListener"
import { ReactiveProxy } from "./ReactiveProxy"

export type IReactiveService = IModule<{
  subscribe(fn: ReactiveListener): VoidFunction
  createStore<T>(value: T): ReactiveProxy<T>
}>

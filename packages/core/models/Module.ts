export type IModule<T = object, B = object> = T & {
  readonly displayName: string
  init(config: B): void
}

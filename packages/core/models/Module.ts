export type IModule<T = object> = T & {
  readonly displayName: string
}

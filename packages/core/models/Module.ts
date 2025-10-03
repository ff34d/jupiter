/**
 * Module interface for class
 */
export type IModule<T = object> = T & {
  readonly name: string
  readonly status: ModuleStatus
  down(): void
  up(): void
  reload(): void
}

/**
 * Module public api for export out module
 */
export type ModuleApi<T = object> = IModule<T>

/**
 * Module status variant
 * * DOWN - 0 module is disabled
 * * INIT - 1 module try initialize
 * * UP - 2 module is running
 */
export enum ModuleStatus {
  DOWN = 0,
  INIT = 1,
  UP = 2,
}

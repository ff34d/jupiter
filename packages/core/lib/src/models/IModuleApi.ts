import { UnitStatus } from "./UnitStatus"

export interface IModuleApi {
  readonly name: string
  getStatus(): UnitStatus
  stop(): void
  run(): void
  reload(): void
}

import { UnitStatus } from "./UnitStatus"

export interface IBaseUnit {
  name: string
  status: UnitStatus
  stop(): void
  run(): void
  reload(): void
}

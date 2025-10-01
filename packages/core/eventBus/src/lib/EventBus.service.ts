import { UnitStatus } from "@jupiter-core/lib"
import { IEventBusService } from "../models"

export class EventBusService implements IEventBusService {
  readonly name: string = "event-bus"
  status: UnitStatus = UnitStatus.stopped

  stop(): void {}
  run(): void {}
  reload(): void {}
}

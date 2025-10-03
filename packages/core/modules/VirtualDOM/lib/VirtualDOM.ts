import { ModuleStatus } from "../../../models"
import { IVirtualDOM } from "../models"

export class VirtualDOM implements IVirtualDOM {
  readonly name: string = "virtual-dom"
  #status: ModuleStatus = ModuleStatus.DOWN

  constructor() {}

  get status() {
    return this.#status
  }

  down(): void {}
  up(): void {}
  reload(): void {}
}

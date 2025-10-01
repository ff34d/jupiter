import { IModuleApi } from "@jupiter-core/lib"
import { EventBusService } from "./lib"

const service = new EventBusService()

const module: IModuleApi = {
  name: service.name,
  getStatus: () => service.status,
  stop: () => service.stop(),
  run: () => service.run(),
  reload: () => service.reload(),
} as const

export default module

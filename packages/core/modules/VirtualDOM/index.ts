import { ModuleApi } from "../../models"
import { VirtualDOM } from "./lib"

const service = new VirtualDOM()

const virtualDOMModule: ModuleApi = {
  name: service.name,
  get status() {
    return service.status
  },
  down: () => service.down(),
  up: () => service.up(),
  reload: () => service.reload(),
}

export default virtualDOMModule

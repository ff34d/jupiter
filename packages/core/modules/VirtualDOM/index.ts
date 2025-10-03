import { ModuleApi } from "../../models"
import { VirtualDOM } from "./lib"

const virtualDOMService = new VirtualDOM()

export default <ModuleApi>{
  name: virtualDOMService.name,
  get status() {
    return virtualDOMService.status
  },
  down: () => virtualDOMService.down(),
  up: () => virtualDOMService.up(),
  reload: () => virtualDOMService.reload(),
}

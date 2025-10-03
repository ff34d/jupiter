import { ModuleApi, ModuleStatus } from "../../models"

const module: ModuleApi = {
  name: "virtual-dom",
  status: ModuleStatus.DOWN,
  down: () => {},
  up: () => {},
  reload: () => {},
}

export { module as default }

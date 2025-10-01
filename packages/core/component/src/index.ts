import { IModule, UnitStatus } from "@jupiter-core/lib"

const module: IModule = {
  name: "component",
  status: UnitStatus.stopped,
  stop: () => {},
  run: () => {},
  reload: () => {},
}

export default module

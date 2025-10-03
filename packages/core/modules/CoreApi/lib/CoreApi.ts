import { VirtualDOM } from "../../VirtualDOM"
import { CoreApiConfig, ICoreApi } from "../models"

export class CoreApi implements ICoreApi {
  readonly displayName: string = "core-api"

  #virtualDOM: VirtualDOM

  constructor(config: CoreApiConfig) {
    this.#virtualDOM = new VirtualDOM({ root: config.root })
  }
}

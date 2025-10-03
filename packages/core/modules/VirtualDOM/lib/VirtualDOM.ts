import { VNode } from "../../../models"
import { IVirtualDOM, VDOMConfig } from "../models"

export class VirtualDOM implements IVirtualDOM {
  readonly displayName: string = "virtual-dom"
  #root: VNode

  constructor(config: VDOMConfig) {
    this.#root = config.root
  }

  get root() {
    return this.#root
  }
}

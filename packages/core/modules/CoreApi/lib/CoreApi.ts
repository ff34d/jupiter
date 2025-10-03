import { IRenderer, Renderer } from "../../Renderer"
import { IVirtualDOM, VirtualDOM } from "../../VirtualDOM"
import { CoreApiConfig, ICoreApi } from "../models"

export class CoreApi implements ICoreApi {
  readonly displayName: string = "core-api"

  #virtualDOM: IVirtualDOM
  #renderer: IRenderer

  constructor(config: CoreApiConfig) {
    this.#virtualDOM = new VirtualDOM({ root: config.root })
    this.#renderer = new Renderer()
  }

  mount(selector: string): void {
    const container = document.querySelector(selector) as HTMLElement | undefined
    if (!container) throw new Error(`Container query is failed ${selector}`)
    this.#renderer.render(this.#virtualDOM.root, container)
  }
}

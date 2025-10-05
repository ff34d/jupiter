import { IModule, VNode } from "../../../models"

export type IRenderer = IModule<{
  mount(root: VNode, container: HTMLElement): void
}>

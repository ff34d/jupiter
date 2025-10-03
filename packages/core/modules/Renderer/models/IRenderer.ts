import { IModule, VNode } from "../../../models"

export type IRenderer = IModule<{
  render(root: VNode, container: HTMLElement): void
}>

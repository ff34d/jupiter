import { IModule, VNode } from "../../../models"

export interface VDOMConfig {
  root: VNode
}

export type IVirtualDOM = IModule<{
  readonly root: VNode
}>

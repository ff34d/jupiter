import { ReactiveBinding } from "../modules"

export interface VNode {
  tag: VNodeTag
  meta: VNodeMeta
  attrs?: VNodeAttrs
  children?: VNodeChildren
}

/*
 * =======================
 * Virtual node types
 * =======================
 */
export type VNodeTag = VNodeHTMLTag | VNodeComponentTag<any>
export type VNodeHTMLTag = keyof HTMLElementTagNameMap

export interface VNodeComponentTag<T = unknown> {
  render: VNodeComponentTagFunction<T>
  props?: T
}

export type VNodeComponentTagFunction<T = unknown> = T extends object
  ? (props: T) => VNode
  : () => VNode

export type VNodeAttrs = Record<VNodeAttrsKey, VNodeAttrsValue>
export type VNodeAttrsKey = string
export type VNodeAttrsValue = string | boolean | number | VoidFunction | ReactiveBinding<any>

export type VNodeChildren = VNodeChild[]
export type VNodeChild = VNode | string | ReactiveBinding<any>

export interface VNodeMeta {
  displayName: string
  el?: HTMLElement
}

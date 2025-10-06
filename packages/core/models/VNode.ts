import { ReactiveBinding } from "../modules"

export interface VNode<T = unknown> {
  tag: VNodeTag<T>
  meta: VNodeMeta
  attrs?: VNodeAttrs
  children?: VNodeChildren
}

/*
 * =======================
 * Virtual node types
 * =======================
 */
export type VNodeTag<T = unknown> = VNodeHTMLTag | VNodeComponentTag<T>
export type VNodeHTMLTag = keyof HTMLElementTagNameMap
export type VNodeComponentTagFunction<T = unknown> = T extends object
  ? (props: T) => VNode
  : () => VNode

export interface VNodeComponentTag<T = unknown> {
  render: VNodeComponentTagFunction<T>
  props?: T
}

export type VNodeAttrs = Record<VNodeAttrsKey, VNodeAttrsValue>
export type VNodeAttrsKey = string
export type VNodeAttrsValue = string | number | VoidFunction | ReactiveBinding<unknown>

export type VNodeChildren = (VNode | string | ReactiveBinding<unknown>)[]

export interface VNodeMeta {
  displayName: string
  el?: HTMLElement
}

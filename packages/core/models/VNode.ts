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
export type VNodeTag = VNodeHTMLTag | VNodeComponentTag
export type VNodeHTMLTag = keyof HTMLElementTagNameMap
export type VNodeComponentTag<T = unknown> = T extends object ? (props: T) => VNode : () => VNode

export type VNodeAttrs = Record<VNodeAttrsKey, VNodeAttrsValue>
export type VNodeAttrsKey = string
export type VNodeAttrsValue = string | number

export type VNodeChildren = (VNode[] | string)[]

export interface VNodeMeta {
  displayName: string
}

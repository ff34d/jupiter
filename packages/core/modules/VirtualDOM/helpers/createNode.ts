import { VNode, VNodeAttrs, VNodeChildren, VNodeMeta, VNodeTag } from "../../../models"

export function createNode(
  tag: VNodeTag,
  meta: VNodeMeta,
  attrs?: VNodeAttrs,
  children?: VNodeChildren
): VNode {
  return {
    tag,
    attrs,
    children,
    meta,
  }
}

/*
 * TODO: This virtual node is tied to HTML.
 * We need to remove the direct connection with the rendering environment.
 */

/**
 * A Virtual Node (VNode), the fundamental unit of the core virtual DOM.
 * Represents either an HTML element or a component in the virtual DOM tree.
 */
export interface VNode {
  /** The tag of the node: either an HTML tag name or a component function */
  tag: VNodeTag

  /** Metadata for the node, e.g., display name for debugging */
  meta: VNodeMeta

  /** Optional attributes for the node, e.g., id, class, or data-* attributes */
  attrs?: VNodeAttrs

  /** Optional children of the node: either text nodes or nested VNodes */
  children?: VNodeChildren
}

/*
 * =======================
 * Virtual node types
 * =======================
 */

/**
 * A Virtual Node tag, which can be either:
 * - an HTML tag name (e.g., 'div', 'span'), or
 * - a component function
 */
export type VNodeTag = VNodeHTMLTag | VNodeComponentTag

/**
 * HTML tag names that can be used in a VNode.
 * Keys come from the built-in `HTMLElementTagNameMap`.
 * Example: 'div', 'span', 'button'
 */
export type VNodeHTMLTag = keyof HTMLElementTagNameMap

/**
 * Component tag type for a VNode.
 *
 * If `T` is an object, it represents the props the component accepts.
 * Otherwise, it is a component without props.
 *
 * Examples:
 * ```ts
 * type CompWithProps = VNodeComponentTag<{ foo: string }>
 * // (props: { foo: string }) => VNode
 *
 * type CompWithoutProps = VNodeComponentTag
 * // () => VNode
 * ```
 */
export type VNodeComponentTag<T = unknown> = T extends object ? (props: T) => VNode : () => VNode

/**
 * Attributes for a VNode.
 * Key-value pairs where keys are strings and values are either string or number.
 * Example: { id: 'app', tabIndex: 0 }
 */
export type VNodeAttrs = Record<VNodeAttrsKey, VNodeAttrsValue>

/** A key for a VNode attribute (e.g., 'id', 'class', 'data-value') */
export type VNodeAttrsKey = string

/** A value for a VNode attribute (e.g., 'my-class', 42) */
export type VNodeAttrsValue = string | number

/**
 * Children of a VNode.
 * Can be a string, a single VNode, or an array containing any combination of strings and VNodes.
 * Example:
 * ```ts
 * children: [
 *   "Hello, ",
 *   { tag: "span", meta: { displayName: "Span" }, children: ["world"] }
 * ]
 * ```
 */
export type VNodeChildren = (VNode[] | string)[]

/**
 * Metadata for a VNode, e.g., display name for debugging purposes.
 */
export interface VNodeMeta {
  /** Human-readable name of the VNode for debugging */
  displayName: string
}

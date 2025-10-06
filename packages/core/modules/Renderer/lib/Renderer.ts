import { VNode, VNodeAttrs } from "../../../models"
import { ReactiveBinding, ReactiveBindingFlag } from "../../ReactiveService/models"
import { IRenderer } from "../models"

export class Renderer implements IRenderer {
  readonly displayName: string = "renderer"

  mount(root: VNode, container: HTMLElement): void {
    container.innerHTML = ""
    container.append(this.#createElement(root))
  }

  update(vnode: VNode): void {
    if (!vnode.meta.el) {
      throw new Error(
        `The meta property of node does not have a reference to element: ${vnode.meta.displayName}`
      )
    }

    const parent = vnode.meta.el.parentElement

    if (!parent) {
      throw new Error(
        `Element node does not have a reference to a parent element: ${vnode.meta.displayName}`
      )
    }

    const newEl = this.#createElement(vnode)
    parent.replaceChild(newEl, vnode.meta.el)
  }

  #createElement(vnode: VNode<any>): HTMLElement {
    if (typeof vnode.tag !== "string") {
      const calcNode = vnode.tag.render(vnode?.tag?.props)
      return this.#createElement(calcNode)
    }

    let el: HTMLElement

    if (vnode.meta.el) {
      el = vnode.meta.el
    } else {
      const domElement = document.createElement(vnode.tag)
      el = domElement
      vnode.meta.el = domElement
    }

    if (vnode.attrs) this.#setAttributes(vnode.attrs, el)
    if (vnode.children) this.#setChildren(vnode, el)

    return el
  }

  #setAttributes(attrs: VNodeAttrs, el: HTMLElement): void {
    for (const [key, value] of Object.entries(attrs)) {
      const loweredKey = key.toLocaleLowerCase()

      if (loweredKey.startsWith("on") && typeof value === "function") {
        el.addEventListener(loweredKey.slice(2), value)
        continue
      }

      if (this.#isReactiveObject(value)) {
        const reactiveObj = value as ReactiveBinding
        el.setAttribute(key, reactiveObj.get(reactiveObj.source))

        if (!reactiveObj.isSubscribed) {
          reactiveObj.source.meta.subscribe(() =>
            el.setAttribute(key, reactiveObj.get(reactiveObj.source))
          )
          reactiveObj.isSubscribed = true
        }

        continue
      }

      el.setAttribute(loweredKey, String(value))
    }
  }

  #setChildren(vnode: VNode, el: HTMLElement): void {
    const children = vnode.children!
    el.innerHTML = ""

    for (const child of children) {
      /* Child is text */
      if (typeof child === "string") {
        el.append(document.createTextNode(child))
        continue
      }

      /* Child is Reactive value */
      if (this.#isReactiveObject(child)) {
        const ch = child as ReactiveBinding
        const textNode = document.createTextNode(ch.get(ch.source))
        el.append(textNode)

        if (!ch.isSubscribed) {
          ch.source.meta.subscribe(() => (textNode.nodeValue = ch.get(ch.source)))
          ch.isSubscribed = true
        }

        continue
      }

      /* Child is virtual node */
      el.append(this.#createElement(child as VNode))
    }
  }

  #isReactiveObject(obj: any): boolean {
    return typeof obj === "object" && ("source" as ReactiveBindingFlag) in obj
  }
}

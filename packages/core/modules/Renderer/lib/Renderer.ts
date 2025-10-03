import { VNode, VNodeAttrs, VNodeChildren } from "../../../models"
import { IRenderer } from "../models"

export class Renderer implements IRenderer {
  readonly displayName: string = "renderer"

  render(root: VNode, container: HTMLElement): void {
    container.innerHTML = ""
    container.append(this.#createElement(root))
  }

  #createElement(vnode: VNode<any>): HTMLElement {
    /* Vnode tag is component */
    if (typeof vnode.tag !== "string") {
      const calcNode = vnode.tag.render(vnode?.tag?.props)
      return this.#createElement(calcNode)
    }

    const el = document.createElement(vnode.tag)

    if (vnode.attrs) this.#setAttributes(vnode.attrs, el)
    if (vnode.children) this.#setChildren(vnode.children, el)

    return el
  }

  #setAttributes(attrs: VNodeAttrs, el: HTMLElement): void {
    for (const [key, value] of Object.entries(attrs)) {
      const loweredKey = key.toLocaleLowerCase()

      if (loweredKey.startsWith("on") && typeof value === "function") {
        el.addEventListener(loweredKey.slice(2), value)
        continue
      }

      el.setAttribute(loweredKey, String(value))
    }
  }

  #setChildren(children: VNodeChildren, el: HTMLElement): void {
    for (const child of children) {
      if (typeof child === "string") {
        el.append(document.createTextNode(child))
        continue
      }

      el.append(this.#createElement(child))
    }
  }
}

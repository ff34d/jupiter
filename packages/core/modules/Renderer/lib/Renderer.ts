import {
  VNode,
  VNodeAttrs,
  VNodeAttrsKey,
  VNodeAttrsValue,
  VNodeChild,
  VNodeChildren,
} from "../../../models"
import { ReactiveBinding, ReactiveBindingFlag } from "../../ReactiveService/models"
import { IRenderer } from "../models"

export class Renderer implements IRenderer {
  readonly displayName: string = "renderer"

  mount(root: VNode, container: HTMLElement): void {
    container.innerHTML = ""
    container.append(this.#createElement(root))
  }

  #createElement(vnode: VNode): HTMLElement {
    if (typeof vnode.tag !== "string") {
      return this.#createElement(vnode.tag.render(vnode?.tag?.props))
    }

    const el = vnode.meta?.el || document.createElement(vnode.tag)
    if (!vnode.meta.el) vnode.meta.el = el

    this.#setAttributes(vnode.attrs, el)
    this.#setChildren(vnode.children, el)

    return el
  }

  #setAttributes(attrs: VNodeAttrs | undefined, el: HTMLElement): void {
    if (!attrs) return

    for (const [key, value] of Object.entries(attrs)) {
      this.#applyAttribute(key, value, el)
    }
  }

  #applyAttribute(key: VNodeAttrsKey, value: VNodeAttrsValue, el: HTMLElement): void {
    const loweredKey = key.toLowerCase()

    if (loweredKey.startsWith("on") && typeof value === "function") {
      el.addEventListener(loweredKey.slice(2), value)
      return
    }

    if (this.#isReactiveObject(value)) {
      const binding = value as ReactiveBinding

      this.#bindReactivity(binding, () => {
        el.setAttribute(key, String(binding.get(binding.source)))
      })

      return
    }

    el.setAttribute(loweredKey, String(value))
  }

  #bindReactivity(binding: ReactiveBinding, callback: VoidFunction) {
    callback()

    if (binding.isSubscribed) return

    binding.source.meta.subscribe(callback)
    binding.isSubscribed = true
  }

  #setChildren(children: VNodeChildren | undefined, el: HTMLElement): void {
    if (!children) return

    el.innerHTML = ""

    for (const child of children) {
      this.#applyChild(child, el)
    }
  }

  #applyChild(child: VNodeChild, el: HTMLElement) {
    if (typeof child === "string") {
      el.append(document.createTextNode(child))
      return
    }

    if (this.#isReactiveObject(child)) {
      const binding = child as ReactiveBinding

      const textNode = document.createTextNode(String(binding.get(binding.source)))
      el.append(textNode)

      this.#bindReactivity(binding, () => {
        textNode.nodeValue = String(binding.get(binding.source))
      })

      return
    }

    el.append(this.#createElement(child as VNode))
  }

  #isReactiveObject(obj: unknown): boolean {
    return obj !== null && typeof obj === "object" && ("source" as ReactiveBindingFlag) in obj
  }
}

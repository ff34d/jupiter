import { VNode } from "../../../models"
import { bind, useState } from "../../ReactiveService"
import { createNode } from "../../VirtualDOM"
import { Renderer } from "../lib"
import { IRenderer } from "../models"

const rootId = "test-node"
const childId = "child-node"

const root: VNode = {
  tag: "div",
  attrs: { id: rootId },
  children: [
    "Hello friend",
    {
      tag: "div",
      attrs: { id: childId },
      children: ["child"],
      meta: {
        displayName: "root-node",
      },
    },
  ],
  meta: {
    displayName: "root-node",
  },
}

describe("[Renderer]: use case", () => {
  let renderer: IRenderer

  beforeAll(() => {
    renderer = new Renderer()

    const rootEl = document.createElement("div")
    rootEl.setAttribute("id", "app")
    document.body.append(rootEl)
  })

  afterAll(() => {
    document.body.innerHTML = ""
  })

  it("Should mount virtual node in dom", () => {
    renderer.mount(root, document.getElementById("app")!)

    expect(document.getElementById(rootId)).not.toBeNull()
    expect(document.getElementById(childId)).not.toBeNull()
  })

  it("Should binding reactive value, increment attribute and children text", () => {
    const state = useState(1)

    const node: VNode = {
      tag: "div",
      attrs: { id: "test-node", idReactive: bind(state, (s) => s.value) },
      children: [bind(state, (s) => s.value)],
      meta: {
        displayName: "node",
      },
    }

    renderer.mount(node, document.getElementById("app")!)

    const el = document.getElementById("test-node")

    expect(el).not.toBeNull()
    expect(el?.getAttribute("idreactive")).toEqual("1")
    expect(el?.textContent).toEqual("1")

    state.value++

    expect(el?.getAttribute("idreactive")).toEqual("2")
    expect(el?.textContent).toEqual("2")
  })

  it("Should create a component node with props", () => {
    const component = ({ id }: { id: string }) => {
      return createNode("div", { displayName: "component" }, { id })
    }

    const node: VNode = {
      tag: "div",
      children: [
        {
          tag: {
            render: component,
            props: { id: "test-props" },
          },
          meta: {
            displayName: "component",
          },
        },
      ],
      meta: {
        displayName: "test-node",
      },
    }

    renderer.mount(node, document.getElementById("app")!)

    const el = document.getElementById("test-props")
    expect(el).not.toBeNull()

    const componentEl = document.getElementById("test-props")
    expect(componentEl).not.toBeNull()
  })

  it("Should node click event listener", () => {
    const state = useState(0)

    const node: VNode = {
      tag: "div",
      children: [
        {
          tag: "button",
          children: ["click"],
          attrs: {
            id: "button-test",
            onClick: () => state.value++,
          },
          meta: {
            displayName: "button",
          },
        },
      ],
      meta: {
        displayName: "node-test",
      },
    }

    renderer.mount(node, document.getElementById("app")!)

    const button = document.getElementById("button-test")
    expect(button).not.toBeNull()

    button?.click()
    expect(state.value).toEqual(1)
  })
})

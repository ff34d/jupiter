import { CoreApi } from ".."
import { VNode } from "../../../models"

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

describe("[CoreApi]: use case", () => {
  let coreApi: CoreApi

  beforeAll(() => {
    coreApi = new CoreApi({ root })

    const rootEl = document.createElement("div")
    rootEl.setAttribute("id", "app")
    document.body.append(rootEl)

    coreApi.mount("#app")
  })

  afterAll(() => {
    document.body.innerHTML = ""
  })

  it("Ping", () => {
    expect(coreApi.displayName).not.toBeUndefined()
  })

  it("Should mount root node in dom", () => {
    expect(document.getElementById(rootId)).not.toBeNull()
    expect(document.getElementById(childId)).not.toBeNull()
  })
})

describe("[CoreApi]: throws", () => {
  it("Should mount error for no container in dom", () => {
    const coreApi = new CoreApi({ root })
    expect(() => coreApi.mount("#app")).toThrow()
  })
})

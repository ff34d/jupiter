import { VNode } from "../../../models"
import { VirtualDOM } from "../lib"

const root: VNode = {
  tag: "div",
  attrs: { id: 10 },
  children: ["Hello friend"],
  meta: {
    displayName: "root-node",
  },
}

describe("[VirtualDOM]", () => {
  let virtualDOM: VirtualDOM

  beforeAll(() => {
    virtualDOM = new VirtualDOM({ root })
  })

  it("Ping", () => {
    expect(virtualDOM.displayName).not.toBeUndefined()
  })
})

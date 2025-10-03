import { CoreApi } from ".."
import { VNode } from "../../../models"

const root: VNode = {
  tag: "div",
  attrs: { id: 10 },
  children: ["Hello friend"],
  meta: {
    displayName: "root-node",
  },
}

describe("[CoreApi]", () => {
  let coreApi: CoreApi

  beforeAll(() => {
    coreApi = new CoreApi({ root })
  })

  it("Ping", () => {
    expect(coreApi.displayName).not.toBeUndefined()
  })
})

import { CoreApi, VNode } from "jupiter"

const node: VNode = {
  tag: "div",
  attrs: {
    class: "app",
  },
  children: [
    "Hello",
    {
      tag: "button",
      children: ["jupiter"],
      attrs: {
        id: "button",
        onClick: () => console.log("s"),
      },
      meta: {
        displayName: "root-node",
      },
    },
    "ok",
  ],
  meta: {
    displayName: "root-node",
  },
}

const app = new CoreApi({ root: node })
app.mount("#app")

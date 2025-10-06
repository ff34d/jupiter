import { CoreApi, createNode, proxy } from "jupiter"
import "./index.css"

const counter = proxy(0)

const Button = createNode(
  "button",
  { displayName: "Button" },
  { class: "app__button", onclick: () => counter.value++ },
  ["Click me!"]
)

const Title = () => {
  return createNode(
    "h1",
    { displayName: "Title" },
    {
      class: "app__title",
      id: { source: counter, get: (s) => s.value },
      counter: { source: counter, get: (s) => s.value },
    },
    ["Hello Friend: ", { source: counter, get: (s) => s.value }]
  )
}

const App = createNode("div", { displayName: "App" }, { class: "app" }, [
  { tag: { render: Title }, meta: { displayName: "Title" } },
  Button,
])

const app = new CoreApi({ root: App })
app.mount("#app")

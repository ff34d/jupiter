import { bind, CoreApi, createNode, useState } from "jupiter"
import "./index.css"

const counter = useState(0)

const Button = () => {
  return createNode(
    "button",
    { displayName: "Button" },
    { class: "app__button", onclick: () => counter.value++ },
    ["Click me!"]
  )
}

const Title = () => {
  return createNode(
    "h1",
    { displayName: "Title" },
    {
      class: "app__title",
      id: bind(counter, (s) => s.value),
      counter: bind(counter, (s) => s.value),
    },
    ["Hello Friend: ", bind(counter, (s) => s.value)]
  )
}

const App = () => {
  return createNode("div", { displayName: "App" }, { class: "app" }, [
    { tag: { render: Title }, meta: { displayName: "Title" } },
    { tag: { render: Button }, meta: { displayName: "Button" } },
  ])
}

const app = new CoreApi({ root: App() })
app.mount("#app")

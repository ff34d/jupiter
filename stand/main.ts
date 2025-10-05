import { CoreApi, createNode, ReactiveService } from "jupiter"
import "./index.css"

const reactive = new ReactiveService()

const counter = reactive.createStore(0)

const Button = createNode(
  "button",
  { displayName: "Button" },
  { class: "app__button", onclick: () => counter.value++ },
  ["Click me!"]
)

const Title = createNode("h1", { displayName: "Title" }, { class: "app__title" }, ["Hello Friend"])
const App = createNode("div", { displayName: "App" }, { class: "app" }, [Title, Button])

const app = new CoreApi({ root: App })
app.mount("#app")

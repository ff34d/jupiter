import { CoreApi, createNode } from "jupiter"
import "./index.css"

const Button = createNode("button", { displayName: "Button" }, { class: "app__button" }, [
  "Click me!",
])
const Title = createNode("h1", { displayName: "Title" }, { class: "app__title" }, ["Hello Friend"])
const App = createNode("div", { displayName: "App" }, { class: "app" }, [Title, Button])

const app = new CoreApi({ root: App })
app.mount("#app")

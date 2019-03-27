import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./components/App"

const app = document.createElement("div")
document.body.prepend(app)

ReactDOM.render(<App />, app)

import * as React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Dashboard } from "./Dashboard"
import { SessionManager } from "./SessionManager"

export class App extends React.Component {
  public render() {
    return (
      <SessionManager>
        <Router>
          <Route path="/" exact component={Dashboard} />
        </Router>
      </SessionManager>
    )
  }
}

import * as React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Dashboard } from "./Dashboard"
import { Login } from "./Login"
import { ProtectedRoute } from "./ProtectedRoute"
import { SessionProvider } from "./SessionProvider"

export class App extends React.Component {
  public render() {
    return (
      <SessionProvider>
        <Router>
          <ProtectedRoute path="/" authenticated exact component={Dashboard} />
          <ProtectedRoute path="/login" component={Login} />
        </Router>
      </SessionProvider>
    )
  }
}

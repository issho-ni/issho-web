import * as React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { CreateUser } from "./CreateUser"
import { Dashboard } from "./Dashboard"
import { LoginUser } from "./LoginUser"
import { ProtectedRoute } from "./ProtectedRoute"
import { SessionProvider } from "./SessionProvider"

export class App extends React.Component {
  public render() {
    return (
      <SessionProvider>
        <Router>
          <ProtectedRoute path="/" authenticated exact component={Dashboard} />
          <ProtectedRoute path="/join" component={CreateUser} />
          <ProtectedRoute path="/login" component={LoginUser} />
        </Router>
      </SessionProvider>
    )
  }
}

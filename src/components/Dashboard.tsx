import * as React from "react"
import { Logout } from "./Logout"

export class Dashboard extends React.Component {
  public render() {
    return (
      <div>
        <h2>Dashboard</h2>
        <Logout />
      </div>
    )
  }
}

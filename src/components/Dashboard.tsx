import * as React from "react"
import { LogoutUser } from "./LogoutUser"

export class Dashboard extends React.Component {
  public render() {
    return (
      <div>
        <h2>Dashboard</h2>
        <LogoutUser />
      </div>
    )
  }
}

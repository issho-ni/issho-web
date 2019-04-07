import * as React from "react"
import { LogoutUser } from "./LogoutUser"
import { TodoList } from "./TodoList"

export class Dashboard extends React.Component {
  public render() {
    return (
      <div>
        <h2>Dashboard</h2>
        <TodoList />
        <LogoutUser />
      </div>
    )
  }
}

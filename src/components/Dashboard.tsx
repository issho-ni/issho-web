import * as React from "react"
import { CreateTodo } from "./CreateTodo"
import { LogoutUser } from "./LogoutUser"

const TodoList = React.lazy(() =>
  import("./TodoList").then(module => ({ default: module.TodoList }))
)

export class Dashboard extends React.Component {
  public render() {
    return (
      <div>
        <h2>Dashboard</h2>
        <TodoList />
        <CreateTodo />
        <LogoutUser />
      </div>
    )
  }
}

import * as React from "react"
import { MutationFn } from "react-apollo"
import { UpdateTodoProps } from "./UpdateTodo"

export interface TodoListItemProps extends UpdateTodoProps {
  updateTodo: MutationFn<UpdateTodoResult>
}

export class TodoListItem extends React.Component<TodoListItemProps> {
  public render() {
    const {
      todo: { text },
    } = this.props
    return <li>{text}</li>
  }
}

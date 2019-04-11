import * as React from "react"
import { MutationFn } from "react-apollo"
import { UpdateTodoProps } from "./UpdateTodo"

export interface TodoListItemProps extends UpdateTodoProps {
  updateTodo: MutationFn<UpdateTodoResult>
}

export class TodoListItem extends React.Component<TodoListItemProps> {
  public render() {
    const {
      todo: { completedAt, text },
    } = this.props
    return (
      <li>
        <input
          type="checkbox"
          checked={completedAt !== null}
          onChange={this.handleChecked}
        />
        {text}
      </li>
    )
  }

  private handleChecked = () => {
    const {
      updateTodo,
      todo: { completedAt, createdAt, id, text },
    } = this.props
    updateTodo({
      optimisticResponse: {
        __typename: "Mutation",
        updateTodo: {
          __typename: "Todo",
          completedAt: completedAt === null ? new Date() : null,
          createdAt,
          id,
          text,
        },
      },
      variables: { done: completedAt === null, id, text },
    })
  }
}

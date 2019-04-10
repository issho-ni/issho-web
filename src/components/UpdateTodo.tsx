import gql from "graphql-tag"
import * as React from "react"
import { Mutation } from "react-apollo"
import { TodoListItem } from "./TodoListItem"

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $text: String, $done: Boolean) {
    updateTodo(input: { id: $id, text: $text, done: $done }) {
      id
      text
      createdAt
      completedAt
    }
  }
`

export interface UpdateTodoProps {
  todo: Todo
}

export class UpdateTodo extends React.Component<UpdateTodoProps> {
  public render() {
    return (
      <Mutation<UpdateTodoResult> mutation={UPDATE_TODO}>
        {updateTodo => <TodoListItem {...{ updateTodo, ...this.props }} />}
      </Mutation>
    )
  }
}

import gql from "graphql-tag"
import * as React from "react"
import { Mutation } from "react-apollo"

const CreateTodoForm = React.lazy(() =>
  import("./CreateTodoForm").then(module => ({
    default: module.CreateTodoForm,
  }))
)

export const CREATE_TODO = gql`
  mutation CreateTodo($text: String!) {
    createTodo(input: { text: $text }) {
      id
      text
      createdAt
      completedAt
    }
  }
`

export class CreateTodo extends React.Component {
  public render() {
    return (
      <Mutation mutation={CREATE_TODO}>
        {createTodo => <CreateTodoForm {...{ createTodo }} />}
      </Mutation>
    )
  }
}

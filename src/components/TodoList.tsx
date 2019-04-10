import gql from "graphql-tag"
import * as React from "react"
import { Query } from "react-apollo"
import { SessionContext } from "./SessionProvider"
import { UpdateTodo } from "./UpdateTodo"

export const GET_TODOS = gql`
  query {
    getTodos {
      id
      text
      createdAt
      completedAt
    }
  }
`

export class TodoList extends React.Component {
  public static contextType = SessionContext
  public context!: React.ContextType<typeof SessionContext>

  public render() {
    return (
      <Query<GetTodosResult> query={GET_TODOS}>
        {({ loading, error, data }) => {
          if (loading) {
            return "Loading…"
          }
          if (error) {
            return `Error! ${error.message}`
          }

          return (
            <ul>
              {data.getTodos.map(todo => (
                <UpdateTodo key={todo.id} {...{ todo }} />
              ))}
            </ul>
          )
        }}
      </Query>
    )
  }
}

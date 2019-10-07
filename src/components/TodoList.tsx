import { Query } from "@apollo/react-components"
import gql from "graphql-tag"
import * as React from "react"
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
            return <div>Loading…</div>
          }

          if (error) {
            return <div>Error! {error.message}</div>
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

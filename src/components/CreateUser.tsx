import gql from "graphql-tag"
import * as React from "react"
import { Mutation } from "react-apollo"

const CreateUserForm = React.lazy(() =>
  import("./CreateUserForm").then(module => ({
    default: module.CreateUserForm,
  }))
)

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $name: String!, $password: String!) {
    createUser(input: { email: $email, name: $name, password: $password }) {
      token
      user {
        email
        name
      }
    }
  }
`

export class CreateUser extends React.Component {
  public render() {
    return (
      <Mutation<CreateUserResult> mutation={CREATE_USER}>
        {createUser => <CreateUserForm {...{ createUser }} />}
      </Mutation>
    )
  }
}

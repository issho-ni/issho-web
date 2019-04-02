import gql from "graphql-tag"
import * as React from "react"
import { Mutation } from "react-apollo"
import { CreateUserForm } from "./CreateUserForm"

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
      <Mutation mutation={CREATE_USER}>
        {createUser => <CreateUserForm {...{ createUser }} />}
      </Mutation>
    )
  }
}

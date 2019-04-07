import gql from "graphql-tag"
import * as React from "react"
import { Mutation } from "react-apollo"

const LoginUserForm = React.lazy(() =>
  import("./LoginUserForm").then(module => ({ default: module.LoginUserForm }))
)

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
      token
      user {
        email
        name
      }
    }
  }
`

export class LoginUser extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOGIN_USER}>
        {loginUser => <LoginUserForm {...{ loginUser }} />}
      </Mutation>
    )
  }
}

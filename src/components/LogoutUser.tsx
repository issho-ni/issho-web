import { Mutation } from "@apollo/react-components"
import gql from "graphql-tag"
import * as React from "react"
import { LogoutUserButton } from "./LogoutUserButton"

export const LOGOUT_USER = gql`
  mutation LogoutUser($ok: Boolean) {
    logoutUser(input: $ok)
  }
`

export class LogoutUser extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOGOUT_USER}>
        {logoutUser => <LogoutUserButton {...{ logoutUser }} />}
      </Mutation>
    )
  }
}

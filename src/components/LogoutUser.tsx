import gql from "graphql-tag"
import * as React from "react"
import { Mutation, MutationFn } from "react-apollo"
import { Redirect } from "react-router"
import { SessionContext, SessionLogoutHandler } from "./SessionContext"

const LOGOUT_USER = gql`
  mutation LogoutUser($ok: Boolean) {
    logoutUser(input: $ok)
  }
`

export class LogoutUser extends React.Component {
  public render() {
    return (
      <SessionContext.Consumer>
        {({ handleLogout }) => (
          <Mutation mutation={LOGOUT_USER}>
            {logoutUser => (
              <a
                href="/logout"
                onClick={this.handleLogout(logoutUser, handleLogout)}
              >
                Log out
              </a>
            )}
          </Mutation>
        )}
      </SessionContext.Consumer>
    )
  }

  private handleLogout = (
    logoutUser: MutationFn,
    handleLogout: SessionLogoutHandler
  ) => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    logoutUser().then(handleLogout)
    return <Redirect to="/login" />
  }
}

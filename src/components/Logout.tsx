import gql from "graphql-tag"
import * as React from "react"
import { Mutation } from "react-apollo"
import { Redirect } from "react-router"
import { SessionContext } from "./SessionContext"

const LOGOUT_USER = gql`
  mutation LogoutUser($ok: Boolean) {
    logoutUser(input: $ok)
  }
`

export class Logout extends React.Component {
  public render() {
    return (
      <SessionContext.Consumer>
        {({ handleLogout }) => (
          <Mutation mutation={LOGOUT_USER}>
            {logoutUser => (
              <a
                href="/logout"
                onClick={e => {
                  e.preventDefault()
                  logoutUser().then(handleLogout)
                  return <Redirect to="/login" />
                }}
              >
                Log out
              </a>
            )}
          </Mutation>
        )}
      </SessionContext.Consumer>
    )
  }
}

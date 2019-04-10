import * as React from "react"
import { MutationFn } from "react-apollo"
import { Redirect } from "react-router"
import { SessionContext } from "./SessionProvider"

export interface LogoutUserButtonProps {
  logoutUser: MutationFn
}

export class LogoutUserButton extends React.Component<LogoutUserButtonProps> {
  public static contextType = SessionContext
  public context!: React.ContextType<typeof SessionContext>

  public render() {
    return (
      <a href="/logout" onClick={this.handleLogoutUser}>
        Log out
      </a>
    )
  }

  private handleLogoutUser = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault()
    return this.props
      .logoutUser()
      .then(this.context.handleLogout)
      .then(() => <Redirect to="/login" />)
  }
}

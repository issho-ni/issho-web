import { MutationFetchResult } from "@apollo/react-common"
import * as React from "react"
import { clearState } from "../utils/state"

const LOCAL_STORAGE_SESSION_KEY = "session"

export type SessionLoginHandler = (
  result: MutationFetchResult<CreateUserResult | LoginUserResult>
) => void
export type SessionLogoutHandler = () => void

export interface SessionProviderState {
  token?: string
  user?: User
}

export interface SessionContext extends SessionProviderState {
  handleLogin: SessionLoginHandler
  handleLogout: SessionLogoutHandler
}

export const SessionContext = React.createContext<SessionContext>(null)

export class SessionProvider extends React.Component<
  Readonly<{}>,
  SessionProviderState
> {
  constructor(props: Readonly<{}>) {
    super(props)

    const session = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY)
    this.state = session ? JSON.parse(session) : {}
  }

  public render = () => (
    <SessionContext.Provider
      value={{
        ...this.state,
        handleLogin: this.handleLogin,
        handleLogout: this.handleLogout,
      }}
      {...this.props}
    />
  )

  private handleLogin = ({
    data,
  }: MutationFetchResult<CreateUserResult | LoginUserResult>) => {
    const { token, user } =
      "createUser" in data ? data.createUser : data.loginUser
    const session = { token, user }
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session))
    this.setState(session)
  }

  private handleLogout = () => {
    localStorage.clear()
    clearState(this, ["token", "user"])
    this.forceUpdate()
  }
}

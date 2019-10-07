import { MutationFetchResult } from "@apollo/react-common"
import * as React from "react"

const LOCAL_STORAGE_SESSION_KEY = "session"

export type SessionLoginHandler = (
  result: MutationFetchResult<LoginUserResult>
) => void
export type SessionLogoutHandler = () => void

export interface SessionProviderState {
  handleLogin: SessionLoginHandler
  handleLogout: SessionLogoutHandler
  token?: string
  user?: User
}

export const SessionContext = React.createContext<SessionProviderState>(null)

export class SessionProvider extends React.Component<
  Readonly<{}>,
  SessionProviderState
> {
  constructor(props: Readonly<{}>) {
    super(props)

    const session = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY)

    this.state = {
      handleLogin: this.handleLogin,
      handleLogout: this.handleLogout,
    }

    if (session) {
      const { token, user } = JSON.parse(session)
      Object.assign(this.state, { token, user })
    }
  }

  public render() {
    return <SessionContext.Provider value={this.state} {...this.props} />
  }

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
    this.setState({ token: null, user: null })
    this.forceUpdate()
  }
}

import * as React from "react"
import { FetchResult } from "react-apollo"

const LOCAL_STORAGE_SESSION_KEY = "session"

export type SessionLoginHandler = (result: FetchResult<LoginUserResult>) => void
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

    this.state = {
      handleLogin: this.handleLogin,
      handleLogout: this.handleLogout,
    }
  }

  public componentWillMount() {
    const session = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY)

    if (session) {
      const { token, user } = JSON.parse(session)
      this.setState({ token, user })
    }
  }

  public render() {
    return <SessionContext.Provider value={this.state} {...this.props} />
  }

  private handleLogin = ({
    data,
  }: FetchResult<CreateUserResult | LoginUserResult>) => {
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

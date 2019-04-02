import * as React from "react"
import { FetchResult } from "react-apollo"
import { SessionContext, SessionContextState } from "./SessionContext"

const LOCAL_STORAGE_SESSION_KEY = "session"

export interface SessionProviderState {
  token?: string
  user?: User
}

export class SessionProvider extends React.Component<
  Readonly<{}>,
  SessionProviderState
> {
  constructor(props: Readonly<{}>) {
    super(props)
    this.state = {}
  }

  public componentWillMount() {
    const session = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY)

    if (session) {
      const { token, user } = JSON.parse(session)
      this.setState({ token, user })
    }
  }

  public render() {
    return (
      <SessionContext.Provider value={this.contextState()} {...this.props} />
    )
  }

  private contextState(): SessionContextState {
    return {
      handleLogin: this.handleLogin,
      handleLogout: this.handleLogout,
      ...this.state,
    }
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

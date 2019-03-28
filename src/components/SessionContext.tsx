import * as React from "react"
import { FetchResult } from "react-apollo"

export interface SessionContextState {
  token?: string
  user?: User
  handleLogin(result: FetchResult<LoginUserResult>): void
  handleLogout(): void
}

export const SessionContext = React.createContext<SessionContextState>(null)

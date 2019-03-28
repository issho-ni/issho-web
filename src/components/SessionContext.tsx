import * as React from "react"
import { FetchResult } from "react-apollo"

export type SessionLoginHandler = (result: FetchResult<LoginUserResult>) => void
export type SessionLogoutHandler = () => void

export interface SessionContextState {
  handleLogin: SessionLoginHandler
  handleLogout: SessionLogoutHandler
  token?: string
  user?: User
}

export const SessionContext = React.createContext<SessionContextState>(null)

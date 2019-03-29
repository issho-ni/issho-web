import * as React from "react"
import { FetchResult } from "react-apollo"
import { SessionProviderState } from "./SessionProvider"

export type SessionLoginHandler = (result: FetchResult<LoginUserResult>) => void
export type SessionLogoutHandler = () => void

export interface SessionContextState extends SessionProviderState {
  handleLogin: SessionLoginHandler
  handleLogout: SessionLogoutHandler
}

export const SessionContext = React.createContext<SessionContextState>(null)

import * as React from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"
import { SessionContext } from "./SessionContext"

export interface ProtectedRouteProps extends RouteProps {
  authenticated?: boolean
}

export class ProtectedRoute extends React.Component<ProtectedRouteProps> {
  public render() {
    const { authenticated, component: Component, ...rest } = this.props

    return (
      <SessionContext.Consumer>
        {({ token }) => (
          <Route
            render={props => {
              if (token && !authenticated) {
                return <Redirect to="/" />
              } else if (!token && authenticated) {
                return <Redirect to="/login" />
              } else {
                return <Component {...props} />
              }
            }}
            {...rest}
          />
        )}
      </SessionContext.Consumer>
    )
  }
}

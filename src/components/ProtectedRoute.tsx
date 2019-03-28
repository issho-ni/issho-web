import * as React from "react"
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom"
import { SessionContext } from "./SessionContext"

export interface ProtectedRouteProps extends RouteProps {
  authenticated?: boolean
}

export class ProtectedRoute extends React.Component<ProtectedRouteProps> {
  public render() {
    const { authenticated, component, ...rest } = this.props

    return (
      <SessionContext.Consumer>
        {({ token }) => (
          <Route render={this.renderComponent(token)} {...rest} />
        )}
      </SessionContext.Consumer>
    )
  }

  private renderComponent = (token: string) => (props: RouteComponentProps) => {
    const { authenticated, component: Component } = this.props

    if (token && !authenticated) {
      return <Redirect to="/" />
    } else if (!token && authenticated) {
      return <Redirect to="/login" />
    } else {
      return <Component {...props} />
    }
  }
}

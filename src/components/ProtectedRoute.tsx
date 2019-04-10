import * as React from "react"
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom"
import { SessionContext } from "./SessionProvider"

export interface ProtectedRouteProps extends RouteProps {
  authenticated?: boolean
}

export class ProtectedRoute extends React.Component<ProtectedRouteProps> {
  public static contextType = SessionContext
  public context!: React.ContextType<typeof SessionContext>

  public render() {
    const { authenticated, component, ...rest } = this.props

    return <Route render={this.renderComponent} {...rest} />
  }

  private renderComponent = (props: RouteComponentProps) => {
    const { authenticated, component: Component } = this.props
    const { token } = this.context

    if (token && !authenticated) {
      return <Redirect to="/" />
    } else if (!token && authenticated) {
      return <Redirect to="/login" />
    } else {
      return <Component {...props} />
    }
  }
}

import * as React from "react"
import { BrowserRouter } from "react-router-dom"

const ApolloProvider = React.lazy(() =>
  import("./ApolloProvider").then(module => ({
    default: module.ApolloProvider,
  }))
)
const CreateUser = React.lazy(() =>
  import("./CreateUser").then(module => ({ default: module.CreateUser }))
)
const Dashboard = React.lazy(() =>
  import("./Dashboard").then(module => ({ default: module.Dashboard }))
)
const LoginUser = React.lazy(() =>
  import("./LoginUser").then(module => ({ default: module.LoginUser }))
)
const ProtectedRoute = React.lazy(() =>
  import("./ProtectedRoute").then(module => ({
    default: module.ProtectedRoute,
  }))
)
const SessionProvider = React.lazy(() =>
  import("./SessionProvider").then(module => ({
    default: module.SessionProvider,
  }))
)

export class App extends React.Component {
  public render() {
    return (
      <React.Suspense fallback={<h1>Loading…</h1>}>
        <SessionProvider>
          <ApolloProvider>
            <BrowserRouter>
              <ProtectedRoute
                path="/"
                authenticated
                exact
                component={Dashboard}
              />
              <ProtectedRoute path="/join" component={CreateUser} />
              <ProtectedRoute path="/login" component={LoginUser} />
            </BrowserRouter>
          </ApolloProvider>
        </SessionProvider>
      </React.Suspense>
    )
  }
}

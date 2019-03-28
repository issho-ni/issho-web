import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { GraphQLRequest } from "apollo-link"
import { setContext } from "apollo-link-context"
import { HttpLink } from "apollo-link-http"
import * as React from "react"
import { ApolloProvider, FetchResult } from "react-apollo"
import { Login } from "./Login"

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
})

export interface SessionManagerProps {
  children: React.ReactNode
}

export interface SessionManagerState {
  token?: string
  user?: User
}

export class SessionManager extends React.Component<
  SessionManagerProps,
  SessionManagerState
> {
  public client: ApolloClient<NormalizedCacheObject>

  constructor(props: SessionManagerProps) {
    super(props)

    const authLink = setContext(this.setContext)

    this.client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    })

    this.state = {
      token: null,
      user: null,
    }
  }

  public handleLogin = ({ data }: FetchResult<LoginUserResult>) => {
    const { token, user } = data.loginUser
    this.setState({ token, user })
  }

  public render() {
    const { token } = this.state

    return (
      <ApolloProvider client={this.client}>
        {token ? "Logged in" : <Login handleLogin={this.handleLogin} />}
      </ApolloProvider>
    )
  }

  public setContext = (_: GraphQLRequest, { headers }) => {
    const { token } = this.state

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  }
}

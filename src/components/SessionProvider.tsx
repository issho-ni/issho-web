import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { GraphQLRequest } from "apollo-link"
import { setContext } from "apollo-link-context"
import { HttpLink } from "apollo-link-http"
import * as React from "react"
import { ApolloProvider, FetchResult } from "react-apollo"
import { SessionContext, SessionContextState } from "./SessionContext"

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
})

export interface SessionProviderProps {
  children: React.ReactNode
}

export class SessionProvider extends React.Component<
  SessionProviderProps,
  SessionContextState
> {
  public client: ApolloClient<NormalizedCacheObject>

  constructor(props: SessionProviderProps) {
    super(props)

    const authLink = setContext(this.setApolloContext)

    this.client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    })

    this.state = {
      token: null,
      user: null,
      handleLogin: this.handleLogin,
    }
  }

  public handleLogin = ({ data }: FetchResult<LoginUserResult>) => {
    const { token, user } = data.loginUser
    this.setState({ token, user })
  }

  public render() {
    return (
      <SessionContext.Provider value={this.state}>
        <ApolloProvider client={this.client} {...this.props} />
      </SessionContext.Provider>
    )
  }

  public setApolloContext = (_: GraphQLRequest, { headers }) => {
    const { token } = this.state

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  }
}

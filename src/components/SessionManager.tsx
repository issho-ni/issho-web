import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { GraphQLRequest } from "apollo-link"
import { setContext } from "apollo-link-context"
import { HttpLink } from "apollo-link-http"
import * as React from "react"
import { ApolloProvider } from "react-apollo"

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
})

export interface SessionManagerProps {
  children: React.ReactNode
}

export interface SessionManagerState {
  token?: string
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
    }
  }

  public render() {
    return <ApolloProvider client={this.client} {...this.props} />
  }

  private setContext(_: GraphQLRequest, { headers }) {
    const { token } = this.state

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  }
}

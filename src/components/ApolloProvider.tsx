import { ApolloProvider } from "@apollo/react-common"
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory"
import ApolloClient from "apollo-client"
import { GraphQLRequest } from "apollo-link"
import { setContext } from "apollo-link-context"
import { HttpLink } from "apollo-link-http"
import * as React from "react"
import { SessionContext } from "./SessionProvider"

export interface ApolloProviderProps {
  children: React.ReactNode
}

export interface ApolloProviderState {
  client: ApolloClient<NormalizedCacheObject>
}

class IsshoApolloProvider extends React.Component<
  ApolloProviderProps,
  ApolloProviderState
> {
  public static contextType = SessionContext
  public context!: React.ContextType<typeof SessionContext>

  constructor(props: Readonly<ApolloProviderProps>) {
    super(props)

    const httpLink = new HttpLink({
      uri: GRAPHQL_ENDPOINT,
    })

    const authLink = setContext(this.setContext)

    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
    })

    this.state = { client }
  }

  public render() {
    const { client } = this.state
    client.clearStore()

    return <ApolloProvider {...{ ...this.props, client }} />
  }

  private setContext = (_: GraphQLRequest, { headers }) => ({
    headers: {
      ...headers,
      authorization: this.context.token ? `Bearer ${this.context.token}` : "",
    },
  })
}

export { IsshoApolloProvider as ApolloProvider }

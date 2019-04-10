import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory"
import ApolloClient from "apollo-client"
import { GraphQLRequest } from "apollo-link"
import { setContext } from "apollo-link-context"
import { HttpLink } from "apollo-link-http"
import * as React from "react"
import { ApolloProvider } from "react-apollo"
import { SessionContext } from "./SessionContext"

export interface ApolloProviderProps {
  children: React.ReactNode
}

class IsshoApolloProvider extends React.Component<ApolloProviderProps> {
  public static contextType = SessionContext
  public context!: React.ContextType<typeof SessionContext>

  private client: ApolloClient<NormalizedCacheObject>

  constructor(props: Readonly<ApolloProviderProps>) {
    super(props)

    const httpLink = new HttpLink({
      uri: GRAPHQL_ENDPOINT,
    })

    const authLink = setContext(this.setContext)

    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
    })
  }

  public render() {
    return <ApolloProvider client={this.client} {...this.props} />
  }

  private setContext = (_: GraphQLRequest, { headers }) => ({
    headers: {
      ...headers,
      authorization: this.context.token ? `Bearer ${this.context.token}` : "",
    },
  })
}

export { IsshoApolloProvider as ApolloProvider }

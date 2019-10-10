import { ApolloProvider as _ApolloProvider } from "@apollo/react-common"
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory"
import ApolloClient from "apollo-client"
import { ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import * as React from "react"
import { AuthLink } from "../lib/apollo/authLink"
import { SessionContext } from "./SessionProvider"

export interface ApolloProviderProps {
  children: React.ReactNode
}

export interface ApolloProviderState {
  client: ApolloClient<NormalizedCacheObject>
}

export class ApolloProvider extends React.Component<
  ApolloProviderProps,
  ApolloProviderState
> {
  public static contextType = SessionContext
  public context!: React.ContextType<typeof SessionContext>

  constructor(props: ApolloProviderProps) {
    super(props)

    const httpLink = new HttpLink({
      uri: GRAPHQL_ENDPOINT,
    })

    const authLink = new AuthLink(this.getToken)

    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: ApolloLink.from([authLink, httpLink]),
    })

    this.state = { client }
  }

  public componentDidUpdate() {
    const { client } = this.state
    client.clearStore()
  }

  public render = () => <_ApolloProvider {...this.props} {...this.state} />

  private getToken = () => this.context.token
}

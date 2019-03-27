import ApolloClient from "apollo-boost"
import * as React from "react"
import { ApolloProvider } from "react-apollo"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Dashboard } from "./Dashboard"

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
})

export class App extends React.Component {
  public render() {
    return (
      <ApolloProvider {...{ client }}>
        <Router>
          <Route path="/" exact component={Dashboard} />
        </Router>
      </ApolloProvider>
    )
  }
}

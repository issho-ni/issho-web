import { ApolloLink } from "apollo-link"
import { ContextSetter, setContext } from "apollo-link-context"

export class AuthLink extends ApolloLink {
  tokenGetter: () => string

  constructor(tokenGetter: () => string) {
    super()

    this.tokenGetter = tokenGetter
    this.request = setContext(this.setContext).request
  }

  private setContext: ContextSetter = (_, { headers = {} }) => {
    const token = this.tokenGetter()
    if (token) headers["authorization"] = `Bearer ${token}`
    return { headers }
  }
}

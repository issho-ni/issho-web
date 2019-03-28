import { Field, Form, Formik } from "formik"
import gql from "graphql-tag"
import * as React from "react"
import { Mutation, MutationFn } from "react-apollo"
import { SessionContext, SessionLoginHandler } from "./SessionContext"

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
      token
      user {
        email
        name
      }
    }
  }
`

interface LoginUserState {
  error?: string
}

interface LoginUserValues {
  email: string
  password: string
}

export class LoginUser extends React.Component<{}, LoginUserState> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  public render() {
    const { error } = this.state

    return (
      <SessionContext.Consumer>
        {({ handleLogin }) => (
          <Mutation mutation={LOGIN_USER}>
            {loginUser => (
              <Formik<LoginUserValues>
                initialValues={{ email: "", password: "" }}
                onSubmit={this.handleLogin(loginUser, handleLogin)}
              >
                {() => (
                  <Form>
                    {error ? <span>{error}</span> : ""}
                    <Field
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                    />
                    <Field
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      required
                    />
                    <button type="submit">Log In</button>
                  </Form>
                )}
              </Formik>
            )}
          </Mutation>
        )}
      </SessionContext.Consumer>
    )
  }

  private handleLogin = (
    loginUser: MutationFn,
    handleLogin: SessionLoginHandler
  ) => (values: LoginUserValues) =>
    loginUser({ variables: values })
      .then(data => {
        this.setState({ error: null })
        return data
      })
      .then(handleLogin)
      .catch(() => this.setState({ error: "Incorrect username or password" }))
}

import { Field, Form, Formik } from "formik"
import gql from "graphql-tag"
import * as React from "react"
import { Mutation, MutationFn } from "react-apollo"
import { RouteComponentProps } from "react-router"
import { Link } from "react-router-dom"
import { clearState } from "../utils/state"
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

export class LoginUser extends React.Component<
  RouteComponentProps,
  LoginUserState
> {
  constructor(props: RouteComponentProps) {
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
                onSubmit={this.handleLoginUser(loginUser, handleLogin)}
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
                    <Link to="/join">Create Account</Link>
                  </Form>
                )}
              </Formik>
            )}
          </Mutation>
        )}
      </SessionContext.Consumer>
    )
  }

  private handleLoginUser = (
    loginUser: MutationFn<LoginUserResult>,
    handleLogin: SessionLoginHandler
  ) => (values: LoginUserValues) =>
    loginUser({ variables: values })
      .then(clearState(this, ["error"]))
      .then(handleLogin)
      .catch(() => this.setState({ error: "Incorrect username or password" }))
}

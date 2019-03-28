import { ErrorMessage, Field, Form, Formik } from "formik"
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

interface LoginUserValues {
  email: string
  password: string
}

export class LoginUser extends React.Component {
  public render() {
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
                    <Field type="email" name="email" autoComplete="email" />
                    <ErrorMessage name="email" component="div" />
                    <Field
                      type="password"
                      name="password"
                      autoComplete="current-password"
                    />
                    <ErrorMessage name="password" component="div" />
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
    loginUser({ variables: values }).then(handleLogin)
}

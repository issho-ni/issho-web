import { ErrorMessage, Field, Form, Formik } from "formik"
import gql from "graphql-tag"
import * as React from "react"
import { FetchResult, Mutation } from "react-apollo"

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

export interface LoginProps {
  handleLogin(result: FetchResult<LoginUserResult>): void
}

export class Login extends React.Component<LoginProps> {
  public render() {
    return (
      <Mutation mutation={LOGIN_USER}>
        {(loginUser, { data }) => (
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={values =>
              loginUser({ variables: values }).then(this.props.handleLogin)
            }
          >
            {() => (
              <Form>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
                <button type="submit">Log In</button>
              </Form>
            )}
          </Formik>
        )}
      </Mutation>
    )
  }
}

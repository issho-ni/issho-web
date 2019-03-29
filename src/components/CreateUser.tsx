import { Field, Form, Formik } from "formik"
import gql from "graphql-tag"
import * as React from "react"
import { Mutation, MutationFn } from "react-apollo"
import { RouteComponentProps } from "react-router"
import { Link } from "react-router-dom"
import { clearState } from "../utils/state"
import { SessionContext, SessionLoginHandler } from "./SessionContext"

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $name: String!, $password: String!) {
    createUser(input: { email: $email, name: $name, password: $password }) {
      token
      user {
        email
        name
      }
    }
  }
`

interface CreateUserState {
  error?: string
}

interface CreateUserValues {
  email: string
  name: string
  password: string
}

export class CreateUser extends React.Component<
  RouteComponentProps,
  CreateUserState
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
          <Mutation mutation={CREATE_USER}>
            {createUser => (
              <Formik<CreateUserValues>
                initialValues={{ email: "", name: "", password: "" }}
                onSubmit={this.handleCreateUser(createUser, handleLogin)}
              >
                {() => (
                  <Form>
                    {error ? <span>{error}</span> : ""}
                    <Field
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                    />
                    <Field
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                    />
                    <Field
                      type="password"
                      name="password"
                      autoComplete="new-password"
                      required
                    />
                    <button type="submit">Create Account</button>
                    <Link to="/login">Log In</Link>
                  </Form>
                )}
              </Formik>
            )}
          </Mutation>
        )}
      </SessionContext.Consumer>
    )
  }

  private handleCreateUser = (
    createUser: MutationFn<LoginUserResult>,
    handleLogin: SessionLoginHandler
  ) => (values: CreateUserValues) =>
    createUser({ variables: values })
      .then(clearState(this, ["error"]))
      .then(handleLogin)
}

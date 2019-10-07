import { MutationFunction } from "@apollo/react-common"
import { Form, Formik } from "formik"
import * as React from "react"
import { Link } from "react-router-dom"
import { clearState } from "../utils/state"
import { Field } from "./Field"
import { SessionContext } from "./SessionProvider"

export interface LoginUserFormProps {
  loginUser: MutationFunction<LoginUserResult>
}

export interface LoginUserFormState {
  error?: string
}

export interface LoginUserFormValues {
  email: string
  password: string
}

export class LoginUserForm extends React.Component<
  LoginUserFormProps,
  LoginUserFormState
> {
  public static contextType = SessionContext
  public context!: React.ContextType<typeof SessionContext>
  public state: LoginUserFormState = {}

  public render() {
    const { error } = this.state

    return (
      <Formik<LoginUserFormValues>
        initialValues={{ email: "", password: "" }}
        onSubmit={this.handleLoginUser}
      >
        {() => (
          <Form>
            {error ? <span>{error}</span> : ""}
            <Field type="email" name="email" autoComplete="email" required />
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
    )
  }

  private handleLoginUser = (variables: LoginUserFormValues) =>
    this.props
      .loginUser({ variables })
      .then(clearState(this, ["error"]))
      .then(this.context.handleLogin)
      .catch(() =>
        this.setState({ error: "Incorrect e-mail address or password" })
      )
}

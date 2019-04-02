import { Field, Form, Formik } from "formik"
import * as React from "react"
import { MutationFn } from "react-apollo"
import { Link } from "react-router-dom"
import { clearState } from "../utils/state"
import { SessionContext } from "./SessionContext"

export interface CreateUserFormProps {
  createUser: MutationFn<LoginUserResult>
}

export interface CreateUserFormState {
  error?: string
}

export interface CreateUserFormValues {
  email: string
  name: string
  password: string
}

export class CreateUserForm extends React.Component<
  CreateUserFormProps,
  CreateUserFormState
> {
  public static contextType = SessionContext
  public context!: React.ContextType<typeof SessionContext>
  public state: CreateUserFormState = {}

  public render() {
    const { error } = this.state

    return (
      <Formik<CreateUserFormValues>
        initialValues={{ email: "", name: "", password: "" }}
        onSubmit={this.handleCreateUser}
      >
        {() => (
          <Form>
            {error ? <span>{error}</span> : ""}
            <Field type="text" name="name" autoComplete="name" required />
            <Field type="email" name="email" autoComplete="email" required />
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
    )
  }

  private handleCreateUser = (variables: CreateUserFormValues) =>
    this.props
      .createUser({ variables })
      .then(clearState(this, ["error"]))
      .then(this.context.handleLogin)
      .catch(() =>
        this.setState({
          error: "Could not create an account with that e-mail address",
        })
      )
}

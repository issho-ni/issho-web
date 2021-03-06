import { MutationFunction } from "@apollo/react-common"
import { Form, Formik } from "formik"
import * as React from "react"
import { Link } from "react-router-dom"
import { clearState } from "../utils/state"
import { Field } from "./Field"
import { SessionContext } from "./SessionProvider"

export interface CreateUserFormProps {
  createUser: MutationFunction<CreateUserResult>
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
      .then(data => {
        clearState(this, ["error"])
        return data
      })
      .then(this.context.handleLogin)
      .catch(() =>
        this.setState({
          error: "Could not create an account with that e-mail address",
        })
      )
}

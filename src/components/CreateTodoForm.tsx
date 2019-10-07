import { MutationFunction } from "@apollo/react-common"
import { Form, Formik, FormikActions } from "formik"
import * as React from "react"
import { Field } from "./Field"
import { GET_TODOS } from "./TodoList"

export interface CreateTodoFormProps {
  createTodo: MutationFunction<CreateTodoResult>
}

export interface CreateTodoFormValues {
  text: string
}

export class CreateTodoForm extends React.Component<CreateTodoFormProps> {
  public render() {
    return (
      <Formik<CreateTodoFormValues>
        initialValues={{ text: "" }}
        onSubmit={this.handleCreateTodo}
      >
        {() => (
          <Form>
            <Field type="text" name="text" required />
            <button type="submit">Create Todo</button>
          </Form>
        )}
      </Formik>
    )
  }

  private handleCreateTodo = (
    variables: CreateTodoFormValues,
    actions: FormikActions<CreateTodoFormValues>
  ) =>
    this.props
      .createTodo({
        optimisticResponse: {
          __typename: "Mutation",
          createTodo: {
            __typename: "Todo",
            completedAt: null,
            createdAt: new Date(),
            id: "temp",
            ...variables,
          },
        },
        update: (proxy, { data: { createTodo } }) => {
          const data = proxy.readQuery<GetTodosResult>({ query: GET_TODOS })
          data.getTodos.push(createTodo)
          proxy.writeQuery({ query: GET_TODOS, data })
        },
        variables,
      })
      .then(() => actions.resetForm({ text: "" }))
}

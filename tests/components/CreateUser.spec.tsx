import { fireEvent, wait, waitForElement } from "@testing-library/react"
import * as React from "react"
import { CREATE_USER, CreateUser } from "../../src/components/CreateUser"
import { render } from "../TestWrapper"

const mocks = [
  {
    request: {
      query: CREATE_USER,
      variables: {
        email: "test@test",
        name: "Test",
        password: "P@55w0rd",
      },
    },
    result: {
      data: {
        createUser: {
          token: "not-a-valid-jwt",
          user: {
            email: "test@test",
            id: "5265b472-4b64-7014-9242-3faa40163fde",
            name: "Test",
          },
        },
      },
    },
  },
  {
    error: new Error(),
    request: {
      query: CREATE_USER,
      variables: {
        email: "error@test",
        name: "Test",
        password: "P@55w0rd",
      },
    },
  },
]

const component = () => render(<CreateUser />, { mocks })

const fillAndSubmit = async (
  { email, name, password },
  { getByLabelText, getByText }
) => {
  const emailInput = await waitForElement(() => getByLabelText(/email/i))
  fireEvent.change(emailInput, { target: { name: "email", value: email } })

  const nameInput = await waitForElement(() => getByLabelText(/name/i))
  fireEvent.change(nameInput, { target: { name: "name", value: name } })

  const passwordInput = await waitForElement(() => getByLabelText(/password/i))
  fireEvent.change(passwordInput, {
    target: { name: "password", value: password },
  })

  const button = await waitForElement(() =>
    getByText(/create account/i, { selector: "button" })
  )
  fireEvent.click(button)
}

describe("CreateUser", () => {
  beforeEach(() => jest.resetAllMocks())

  it("renders without error", async () => {
    const { container, getByText } = component()
    await wait(() => getByText(/create account/i, { selector: "button" }))

    expect(container).toMatchSnapshot()
  })

  it("submits the entered values", async () => {
    await fillAndSubmit(mocks[0].request.variables, component())

    await wait(() =>
      expect(localStorage.setItem).toBeCalledWith(
        "session",
        JSON.stringify(mocks[0].result.data.createUser)
      )
    )
  })

  it("displays errors", async () => {
    const { getByLabelText, getByText } = component()
    await fillAndSubmit(mocks[1].request.variables, {
      getByLabelText,
      getByText,
    })

    await wait(() =>
      getByText("Could not create an account with that e-mail address")
    )
    expect(localStorage.setItem).not.toBeCalled()
  })
})

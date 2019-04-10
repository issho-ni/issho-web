import * as React from "react"
import { fireEvent, wait, waitForElement } from "react-testing-library"
import { LOGIN_USER, LoginUser } from "../../src/components/LoginUser"
import { render } from "../TestWrapper"

const mocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        email: "test@test",
        password: "P@55w0rd",
      },
    },
    result: {
      data: {
        loginUser: {
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
]

const component = () => render(<LoginUser />, { mocks })

describe("LoginUser", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("renders without error", async () => {
    const { container, getByText } = component()
    await wait(() => getByText(/log in/i, { selector: "button" }))

    expect(container).toMatchSnapshot()
  })

  it("submits the entered values", async () => {
    const { email, password } = mocks[0].request.variables
    const { getByLabelText, getByText } = component()

    const emailInput = await waitForElement(() => getByLabelText(/email/i))
    fireEvent.change(emailInput, {
      target: { name: "email", value: email },
    })

    const passwordInput = await waitForElement(() =>
      getByLabelText(/password/i)
    )
    fireEvent.change(passwordInput, {
      target: { name: "password", value: password },
    })

    const button = await waitForElement(() =>
      getByText(/log in/i, { selector: "button" })
    )
    fireEvent.click(button)

    await wait(() =>
      expect(localStorage.setItem).toBeCalledWith(
        "session",
        JSON.stringify(mocks[0].result.data.loginUser)
      )
    )
  })

  it("displays errors", async () => {
    const { getByText } = component()

    const button = await waitForElement(() =>
      getByText(/log in/i, { selector: "button" })
    )
    fireEvent.click(button)

    await wait(() => getByText("Incorrect e-mail address or password"))
    expect(localStorage.setItem).not.toBeCalled()
  })
})

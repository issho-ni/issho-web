import { mount } from "enzyme"
import * as React from "react"
import { LOGIN_USER, LoginUser } from "../../src/components/LoginUser"
import { LoginUserForm } from "../../src/components/LoginUserForm"
import { TestWrapper } from "../TestWrapper"
import { wait } from "../wait"

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

const wrapped = (
  <TestWrapper {...{ mocks }}>
    <LoginUser />
  </TestWrapper>
)
const component = mount(wrapped)

describe("LoginUser", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders without error", () => {
    expect(component.find(LoginUser)).toMatchSnapshot()
  })

  it("submits the entered values", async () => {
    const { email, password } = mocks[0].request.variables
    const persist = () => null

    const emailInput = component.find('input[name="email"]')
    emailInput.simulate("change", {
      persist,
      target: { name: "email", value: email },
    })

    const passwordInput = component.find('input[name="password"]')
    passwordInput.simulate("change", {
      persist,
      target: { name: "password", value: password },
    })

    const form = component.find("Form")
    form.simulate("submit")

    await wait(100)
    expect(localStorage.setItem).toBeCalledWith(
      "session",
      JSON.stringify(mocks[0].result.data.loginUser)
    )
  })

  it("displays errors", async () => {
    const form = component.find("Form")
    form.simulate("submit")

    await wait(100)
    expect(localStorage.setItem).not.toBeCalled()
    expect(component.find(LoginUserForm).state()).toHaveProperty("error")
  })
})

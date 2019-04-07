import { mount } from "enzyme"
import * as React from "react"
import { CREATE_USER, CreateUser } from "../../src/components/CreateUser"
import { CreateUserForm } from "../../src/components/CreateUserForm"
import { TestWrapper } from "../TestWrapper"
import { wait } from "../wait"

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

const wrapped = (
  <TestWrapper {...{ mocks }}>
    <CreateUser />
  </TestWrapper>
)
const component = mount(wrapped)

describe("CreateUser", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders without error", () => {
    expect(component.find(CreateUser)).toMatchSnapshot()
  })

  it("submits the entered values", async () => {
    const { email, name, password } = mocks[0].request.variables
    const persist = () => null

    const emailInput = component.find('input[name="email"]')
    emailInput.simulate("change", {
      persist,
      target: { name: "email", value: email },
    })

    const nameInput = component.find('input[name="name"]')
    nameInput.simulate("change", {
      persist,
      target: { name: "name", value: name },
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
      JSON.stringify(mocks[0].result.data.createUser)
    )
  })

  it("displays errors", async () => {
    const { email, name, password } = mocks[1].request.variables
    const persist = () => null

    const emailInput = component.find('input[name="email"]')
    emailInput.simulate("change", {
      persist,
      target: { name: "email", value: email },
    })

    const nameInput = component.find('input[name="name"]')
    nameInput.simulate("change", {
      persist,
      target: { name: "name", value: name },
    })

    const passwordInput = component.find('input[name="password"]')
    passwordInput.simulate("change", {
      persist,
      target: { name: "password", value: password },
    })

    const form = component.find("Form")
    form.simulate("submit")

    await wait(100)
    expect(localStorage.setItem).not.toBeCalled()
    expect(component.find(CreateUserForm).state()).toHaveProperty("error")
  })
})

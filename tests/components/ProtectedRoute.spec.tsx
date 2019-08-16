import { wait } from "@testing-library/react"
import * as React from "react"
import { Route } from "react-router-dom"
import { mocked } from "ts-jest/utils"
import {
  ProtectedRoute,
  ProtectedRouteProps,
} from "../../src/components/ProtectedRoute"
import { render } from "../TestWrapper"

const TestComponent = () => <div>Test</div>
const LoginComponent = () => <div>Login</div>
const LogoutComponent = () => <div>Logout</div>

const component = (props: ProtectedRouteProps = {}) =>
  render(
    <div>
      <Route path="/" exact component={LogoutComponent} />
      <Route path="/login" component={LoginComponent} />
      <ProtectedRoute path="/test" component={TestComponent} {...props} />
    </div>,
    { initialEntries: ["/test"] }
  )

describe("ProtectedRoute", () => {
  describe("with a token", () => {
    beforeAll(() =>
      mocked(localStorage.getItem).mockImplementation(() =>
        JSON.stringify({
          token: "not-a-valid-jwt",
          user: {
            email: "test@test",
            id: "1",
            name: "Test",
          },
        })
      )
    )

    afterAll(() => jest.resetAllMocks())

    describe("requiring authentication", () => {
      it("renders the authenticated component", async () => {
        const { container, getByText } = component({ authenticated: true })
        await wait(() => getByText(/test/i))

        expect(container).toMatchSnapshot()
      })
    })

    describe("requiring unauthentication", () => {
      it("asks for logout", async () => {
        const { container, getByText } = component()
        await wait(() => getByText(/logout/i))

        expect(container).toMatchSnapshot()
      })
    })
  })

  describe("without a token", () => {
    describe("requiring authentication", () => {
      it("asks for login", async () => {
        const { container, getByText } = component({ authenticated: true })
        await wait(() => getByText(/login/i))

        expect(container).toMatchSnapshot()
      })
    })

    describe("requiring unauthentication", () => {
      it("renders the unauthenticated component", async () => {
        const { container, getByText } = component()
        await wait(() => getByText(/test/i))

        expect(container).toMatchSnapshot()
      })
    })
  })
})

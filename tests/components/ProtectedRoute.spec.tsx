import { shallow } from "enzyme"
import * as React from "react"
import { ProtectedRoute } from "../../src/components/ProtectedRoute"
import { SessionContext } from "../../src/components/SessionContext"

const TestComponent = () => <div>Test</div>

const component = (props = {}) => state =>
  shallow(<ProtectedRoute path="/test" component={TestComponent} {...props} />)
    .find(SessionContext.Consumer)
    .renderProp("children")(state)
    .renderProp("render")()

const contextState = {
  handleLogin: jest.fn(),
  handleLogout: jest.fn(),
}

const contextStateWithToken = { ...contextState, token: "not-a-valid-jwt" }

describe("ProtectedRoute", () => {
  describe("requiring authentication", () => {
    const tree = component({ authenticated: true })

    describe("with a token", () => {
      it("renders the component", () => {
        expect(tree(contextStateWithToken)).toMatchSnapshot()
      })
    })

    describe("without a token", () => {
      it("redirects to /login", () => {
        expect(tree(contextState)).toMatchSnapshot()
      })
    })
  })

  describe("requiring unauthentication", () => {
    const tree = component()

    describe("with a token", () => {
      it("redirects to /", () => {
        expect(tree(contextStateWithToken)).toMatchSnapshot()
      })
    })

    describe("without a token", () => {
      it("renders the component", () => {
        expect(tree(contextState)).toMatchSnapshot()
      })
    })
  })
})

import { shallow } from "enzyme"
import * as React from "react"
import { SessionProvider } from "../../src/components/SessionProvider"

const TestComponent = () => <div>Test</div>

const component = () =>
  shallow(
    <SessionProvider>
      <TestComponent />
    </SessionProvider>
  )

describe("SessionProvider", () => {
  describe("with a session in local storage", () => {
    localStorage.setItem(
      "session",
      JSON.stringify({
        token: "not-a-valid-jwt",
        user: {
          email: "test@test",
          id: "5265b472-4b64-7014-9242-3faa40163fde",
          name: "Test",
        },
      })
    )

    const tree = component()

    it("sets the token and user in the state", () => {
      expect(localStorage.getItem).toBeCalledWith("session")
      expect(tree.state()).toEqual({
        token: "not-a-valid-jwt",
        user: {
          email: "test@test",
          id: "5265b472-4b64-7014-9242-3faa40163fde",
          name: "Test",
        },
      })
    })

    it("empties the state and storage on logout", () => {})
  })
})

import * as React from "react"
import { fireEvent, render, wait, waitForElement } from "react-testing-library"
import { mocked } from "ts-jest/utils"
import { SessionContext } from "../../src/components/SessionContext"
import { SessionProvider } from "../../src/components/SessionProvider"

const data = {
  loginUser: {
    token: "not-a-valid-jwt",
    user: {
      email: "test@test",
      id: "5265b472-4b64-7014-9242-3faa40163fde",
      name: "Test",
    },
  },
}

const login = handleLogin => () => handleLogin({ data })

const component = () =>
  render(
    <SessionProvider>
      <SessionContext.Consumer>
        {({ token, user, handleLogin, handleLogout }) => (
          <div>
            Token:
            <span>{token || "none"}</span>
            <br />
            User:
            <span>{user ? user.email : "none"}</span>
            <br />
            <button onClick={login(handleLogin)}>Log in</button>
            <button onClick={handleLogout}>Log out</button>
          </div>
        )}
      </SessionContext.Consumer>
    </SessionProvider>
  )

describe("SessionProvider", () => {
  describe("with a session in local storage", () => {
    beforeEach(() => {
      mocked(localStorage.getItem).mockImplementation(() =>
        JSON.stringify(data.loginUser)
      )
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it("sets the token and user in the state", async () => {
      const { container, getByText } = component()
      await wait(() => getByText(data.loginUser.user.email))

      expect(localStorage.getItem).toBeCalledWith("session")
      expect(container).toMatchSnapshot()
    })

    it("empties the state and storage on logout", async () => {
      const { container, getAllByText, getByText } = component()
      const button = await waitForElement(() => getByText(/log out/i))
      fireEvent.click(button)

      await wait(() => getAllByText(/none/i))

      expect(localStorage.clear).toBeCalled()
      expect(container).toMatchSnapshot()
    })
  })

  describe("with empty local storage", () => {
    it("has no token or user in the state", async () => {
      const { container, getAllByText } = component()
      await wait(() => getAllByText(/none/i))

      expect(container).toMatchSnapshot()
    })

    it("writes the token and user to the state on login", async () => {
      const { container, getByText } = component()
      const button = await waitForElement(() => getByText(/log in/i))
      fireEvent.click(button)

      await wait(() => getByText(data.loginUser.user.email))

      expect(localStorage.setItem).toBeCalledWith(
        "session",
        JSON.stringify(data.loginUser)
      )
      expect(container).toMatchSnapshot()
    })
  })
})

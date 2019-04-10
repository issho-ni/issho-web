import * as React from "react"
import { fireEvent, wait, waitForElement } from "react-testing-library"
import { LOGOUT_USER, LogoutUser } from "../../src/components/LogoutUser"
import { render } from "../TestWrapper"

const mocks = [
  { request: { query: LOGOUT_USER }, result: { data: { logoutUser: {} } } },
]

const component = () => render(<LogoutUser />, { mocks })

describe("LogoutUser", () => {
  it("renders without error", async () => {
    const { container, getByText } = component()
    await wait(() => getByText(/log out/i))

    expect(container).toMatchSnapshot()
  })

  it("calls the logout handler", async () => {
    const { container, getByText } = component()
    const link = await waitForElement(() => getByText(/log out/i))
    fireEvent.click(link)

    await wait(() => {
      expect(localStorage.clear).toBeCalled()
      expect(localStorage.__STORE__.session).toBeUndefined()
    })
  })
})

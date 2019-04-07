import { mount } from "enzyme"
import * as React from "react"
import { LOGOUT_USER, LogoutUser } from "../../src/components/LogoutUser"
import { TestWrapper } from "../TestWrapper"
import { wait } from "../wait"

const mocks = [
  { request: { query: LOGOUT_USER }, result: { data: { logoutUser: {} } } },
]

const wrapper = (
  <TestWrapper {...{ mocks }}>
    <LogoutUser />
  </TestWrapper>
)
const component = mount(wrapper)

describe("LogoutUser", () => {
  it("renders without error", () => {
    expect(component.find(LogoutUser)).toMatchSnapshot()
  })

  it("calls the logout handler", async () => {
    component.find("a").simulate("click")

    await wait(100)
    expect(localStorage.clear).toBeCalled()
    expect(localStorage.__STORE__.session).toBeUndefined()
  })
})

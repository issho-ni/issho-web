import { render, wait } from "@testing-library/react"
import * as React from "react"
import { StaticRouter } from "react-router-dom"
import { mocked } from "ts-jest/utils"
import { App } from "../../src/components/App"

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    BrowserRouter: props => <div {...props} />,
  }
})

const component = (location: string) => (
  <StaticRouter {...{ location }}>
    <App />
  </StaticRouter>
)

describe("App", () => {
  beforeEach(() => jest.resetAllMocks())

  describe("/ route", () => {
    it("renders without error", async () => {
      mocked(localStorage.getItem).mockImplementation(() =>
        JSON.stringify({
          token: "not-a-valid-jwt",
        })
      )

      const { container, getByText } = render(component("/"))
      await wait(() => getByText(/dashboard/i))

      expect(container).toMatchSnapshot()
    })
  })

  describe("/join route", () => {
    it("renders without error", async () => {
      const { container, getByText } = render(component("/join"))
      await wait(() => getByText(/create account/i, { selector: "button" }))

      expect(container).toMatchSnapshot()
    })
  })

  describe("/login route", () => {
    it("renders without error", async () => {
      const { container, getByText } = render(component("/login"))
      await wait(() => getByText(/log in/i, { selector: "button" }))

      expect(container).toMatchSnapshot()
    })
  })
})

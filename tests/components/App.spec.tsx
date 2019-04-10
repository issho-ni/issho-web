import * as React from "react"
import { MockedProvider } from "react-apollo/test-utils"
import { StaticRouter } from "react-router-dom"
import { render, wait } from "react-testing-library"
import { mocked } from "ts-jest/utils"
import { App } from "../../src/components/App"
import { GET_TODOS } from "../../src/components/TodoList"

jest.mock("react-apollo", () => {
  return {
    ...jest.requireActual("react-apollo"),
    ApolloProvider: props => <div {...props} />,
  }
})

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    BrowserRouter: props => <div {...props} />,
  }
})

const mocks = [
  {
    request: {
      query: GET_TODOS,
    },
    result: {
      data: {
        getTodos: [
          {
            completedAt: null,
            createdAt: "2019-04-05T22:41:53Z",
            id: 1,
            text: "Test Todo",
          },
        ],
      },
    },
  },
]

const component = (location: string) => (
  <MockedProvider addTypename={false} {...{ mocks }}>
    <StaticRouter {...{ location }}>
      <App />
    </StaticRouter>
  </MockedProvider>
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
      await wait(() => getByText(/test todo/i))

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

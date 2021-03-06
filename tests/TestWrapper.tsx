import { MockedProvider } from "@apollo/react-testing"
import { render } from "@testing-library/react"
import * as React from "react"
import { MemoryRouterProps } from "react-router"
import { MemoryRouter } from "react-router-dom"
import { SessionProvider } from "../src/components/SessionProvider"

export interface TestWrapperState extends MemoryRouterProps {
  mocks?: any
}

const TestWrapper = (state: TestWrapperState) =>
  class extends React.Component<Readonly<{}>, TestWrapperState> {
    constructor(props: Readonly<{}>) {
      super(props)
      this.state = state
    }

    public render() {
      const { children } = this.props
      const { mocks, ...rest } = this.state

      return (
        <React.Suspense fallback={<div />}>
          <SessionProvider>
            <MockedProvider addTypename={false} {...{ mocks }}>
              <MemoryRouter {...{ ...rest, children }} />
            </MockedProvider>
          </SessionProvider>
        </React.Suspense>
      )
    }
  }

const customRender = (ui, state: TestWrapperState = {}, options = {}) =>
  render(ui, { wrapper: TestWrapper(state), ...options })

export * from "@testing-library/react"
export { customRender as render }

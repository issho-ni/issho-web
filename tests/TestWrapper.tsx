import * as React from "react"
import { MockedProvider } from "react-apollo/test-utils"
import { MemoryRouter } from "react-router"
import { SessionProvider } from "../src/components/SessionProvider"

export interface TestWrapperProps {
  mocks?: any
  provider?: any
}

export class TestWrapper extends React.Component<TestWrapperProps> {
  public render() {
    const { mocks, ...rest } = this.props

    return (
      <SessionProvider>
        <MockedProvider addTypename={false} {...{ mocks }}>
          <MemoryRouter {...rest} />
        </MockedProvider>
      </SessionProvider>
    )
  }
}

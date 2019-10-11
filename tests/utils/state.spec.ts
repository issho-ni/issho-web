import * as React from "react"
import { clearState } from "../../src/utils/state"

jest.mock("react")

interface TestState {
  foo: number
  bar: number
  baz: number
}

describe("clearState", () => {
  const node = new React.Component<Readonly<{}>, TestState>({})
  node.state = { foo: 1, bar: 2, baz: 3 }
  const keys = ["foo", "bar"]
  const newState = { ...node.state, foo: null, bar: null }

  it("calls setState with all given keys as null", () => {
    clearState(node, keys)
    expect(node.setState).toBeCalledWith(newState)
    expect(node.state).toEqual(newState)
  })
})

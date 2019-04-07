import * as React from "react"
import { clearState } from "../../src/utils/state"

jest.mock("react")

describe("clearState", () => {
  const node = new React.Component({})
  const keys = ["foo", "bar"]
  const data = { a: 1, b: 2 }
  const result = clearState(node, keys)(data)

  it("calls setState with all given keys as null", () => {
    expect(node.setState).toBeCalledWith({ foo: null, bar: null })
  })

  it("returns the provided data", () => {
    expect(result).toEqual(data)
  })
})

import { shallow } from "enzyme"
import * as React from "react"
import { App } from "../../src/components/App"

describe("App", () => {
  it("renders without error", () => {
    const component = shallow(<App />)
    expect(component).toMatchSnapshot()
  })
})

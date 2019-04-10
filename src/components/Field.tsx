import { Field, FieldAttributes } from "formik"
import * as React from "react"

export interface IsshoFieldProps {
  label?: string
}

class IsshoField extends React.Component<FieldAttributes<IsshoFieldProps>> {
  public render() {
    const { label } = this.props

    return (
      <div>
        <label htmlFor={this.props.name}>{label || this.props.name}</label>
        <Field id={this.props.name} {...this.props} />
      </div>
    )
  }
}

export { IsshoField as Field }

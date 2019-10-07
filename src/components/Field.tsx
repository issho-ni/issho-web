import { Field as _Field, FieldAttributes } from "formik"
import * as React from "react"

export interface FieldProps {
  label?: string
}

export class Field extends React.Component<FieldAttributes<FieldProps>> {
  public render() {
    const { label } = this.props

    return (
      <div>
        <label htmlFor={this.props.name}>{label || this.props.name}</label>
        <_Field id={this.props.name} {...this.props} />
      </div>
    )
  }
}

import React from 'react'
import "./Button.css"

const Button = ({children, classname, type, disabled,onChange}) => {
  return (
    <div>
      <button type={type} className={classname} disabled={disabled} onChange={onChange}>{children}</button>
    </div>
  )
}

export default Button

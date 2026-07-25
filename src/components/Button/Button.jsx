import React from 'react'
import "./Button.css"

const Button = ({children, classname}) => {
  return (
    <div>
      <button className={classname}><p>تسجيل الدخول</p></button>
    </div>
  )
}

export default Button

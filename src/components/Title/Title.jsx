import React from 'react'

const Title = ({children, classname}) => {
  return (
    <div>
      <h3 className={classname}>{children}</h3>
    </div>
  )
}

export default Title

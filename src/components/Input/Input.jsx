import React from 'react'

const Input = ({type,placeholder,id,name}) => {
  return (
   <>
   <input type={type}
    placeholder={placeholder}
    id={id}
    name={name}
   />
   </>
  )
}

export default Input

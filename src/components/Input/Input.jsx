import React from 'react'

const Input = ({type,placeholder,id,name,value,onChange,minLength}) => {
  return (
   <>
   <input type={type}
    placeholder={placeholder}
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    minLength={minLength}
   />
   </>
  )
}

export default Input

import React from "react"
import "../../Pages/Login/login.css"

const CustomInput = ({ type, placeholder, required, value, handleChange, name, className, disabled }) => {
  return (
    <div className={`input-field ${className} ${disabled ? "disable-custom-input" : ""}`}>
      <input type={type} placeholder={placeholder} name={name} required={required} value={value} onChange={handleChange} disabled={disabled} />
    </div>
  )
}

export default CustomInput

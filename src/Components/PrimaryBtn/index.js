import React from "react"
import "./style.css"

const PrimaryBtn = ({ text, className, btnStyle, onClick, disable }) => {
  return (
    <button className={`${className} primary-btn ${disable ? "disable-primary-btn" : ""}`} style={btnStyle} onClick={onClick} disabled={disable}>
      {text || "Submit"}
    </button>
  )
}

export default PrimaryBtn

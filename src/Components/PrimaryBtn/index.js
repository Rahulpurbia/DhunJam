import React from "react"
import "./style.css"

const PrimaryBtn = ({ text, className, btnStyle }) => {
  return (
    <button className={`${className} primary-btn`} style={btnStyle}>
      {text || "Submit"}
    </button>
  )
}

export default PrimaryBtn

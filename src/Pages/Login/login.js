import React, { useState, useRef } from "react"
import PrimaryBtn from "../../Components/PrimaryBtn"
import Eye from "../../Images/eye.png"
import Invisible from "../../Images/invisible.png"
import "./login.css"

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  })
  const [imageSrc, setImageSrc] = useState(Invisible)

  const passwordRef = useRef()

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }

  const handleTogglePassword = () => {
    if (passwordRef?.current?.type === "password") {
      passwordRef.current.type = "text"
      setImageSrc(Eye)
    } else {
      passwordRef.current.type = "password"
      setImageSrc(Invisible)
    }
  }

  return (
    <div className="dark-background minheight-100 login-wrapper">
      <form className="w-600">
        <h3 className="text-center mb-10 heading">Venue Admin Login</h3>
        <div className="input-field width-600">
          <input type="text" placeholder="Username" name="username" required value={userDetails.username} onChange={handleChange} />
        </div>
        <div className="input-field width-600">
          <input type="password" placeholder="Password" name="password" required value={userDetails.password} onChange={handleChange} ref={passwordRef} />
          <img src={imageSrc} alt="eye" height={"22px"} onClick={handleTogglePassword} />
        </div>
        <PrimaryBtn className="mt-10" />
        <div className="text-center">New Registration?</div>
      </form>
    </div>
  )
}

export default Login

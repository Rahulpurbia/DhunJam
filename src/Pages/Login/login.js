import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PrimaryBtn from "../../Components/PrimaryBtn"
import Eye from "../../Images/eye.png"
import Invisible from "../../Images/invisible.png"
import axios from "axios"
import "./login.css"

const Login = ({ setMessage, setMessageType }) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  })
  const [imageSrc, setImageSrc] = useState(Invisible)
  const navigate = useNavigate()

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

  const handleSubmitLogin = (e) => {
    e.preventDefault()
    axios
      .post("https://stg.dhunjam.in/account/admin/login", userDetails)
      .then((response) => {
        if (response.status == 200) {
          console.log(response)
          localStorage.setItem("isLoggedIn", "true")
          localStorage.setItem("userId", JSON.stringify(response.data?.data?.id))
          localStorage.setItem("token", JSON.stringify(response.data?.data?.token))
          navigate("/dashboard")
        } else {
          setMessage("Something went wrong")
          setMessageType("info")
        }
      })
      .catch((error) => {
        setMessage("Please enter valid email and password")
        setMessageType("danger")
      })
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    isLoggedIn == "true" && navigate("/dashboard")
  }, [])

  return (
    <div className="dark-background minheight-100 login-wrapper">
      <form className="w-600" onSubmit={handleSubmitLogin}>
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

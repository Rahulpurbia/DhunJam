import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn")
    if (loggedIn != "true") navigate("/login")
    else {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return <h2 className="mt-30 text-black center heading"> ....Loading</h2>
  } else {
    return Component
  }
}

export default ProtectedRoute

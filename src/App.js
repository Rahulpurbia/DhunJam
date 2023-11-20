import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import "./App.css"
import ProtectedRoute from "./Components/ProtectedRoute"
import Dashboard from "./Pages/Dashboard/dashboard"
import Login from "./Pages/Login/login"

function App() {
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("success")

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("")
      }, 2500)
    }
  }, [message])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login setMessage={setMessage} setMessageType={setMessageType} />} />
          <Route path="/dashboard" element={<ProtectedRoute Component={<Dashboard setMessage={setMessage} setMessageType={setMessageType} />} />} />
          <Route
            path="/*"
            element={
              <h1 className="text-black">
                Page Not Found...go to <Link to="/dashboard">Dashboard</Link> or <Link to="/login">Login page</Link>
              </h1>
            }
          />
        </Routes>
      </BrowserRouter>
      {message && <div className={`toast-message ${messageType}`}>{message}</div>}
    </div>
  )
}

export default App

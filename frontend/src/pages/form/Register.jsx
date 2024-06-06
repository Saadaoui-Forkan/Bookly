import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './form.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  window.scroll(0,0)

  const [email,setEmail] = useState("")
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

  // form submit handler
  const formSubmitHandler = (e) => {
      e.preventDefault()
      if (email.trim() === "") {
          return toast.error("Email is required")
      }
      if (password === "") {
          return toast.error("Password is required")
      }
      if (username.trim() === "") {
          return toast.error("Username is required")
      }
    }
  return (
    <div className="form-wrapper">
    <ToastContainer theme="colored"/>
    <h1 className="form-title">Create new account</h1>
    <form onSubmit={formSubmitHandler}  className="form">
      <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
      />
      <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
      />
      <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
      />
      <button className="form-btn" type="submit">
        Register
      </button>
    </form>
    <div className="form-footer">
      Already have an account ?{" "}
      <Link to="/login" className="forms-link">
        Login
      </Link>
    </div>
  </div>
  )
}

export default Register
import { useState } from 'react'

import axios from "axios"

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = e => {
    e.preventDefault()

    axios
      .post("http://localhost:5000/auth/register", { email, password })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div>
      <form id="register" onSubmit={handleSubmit}>
        <h1>Register</h1>

        <p className="item">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </p>

        <p className="item">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </p>

        <p className="item">
          <input type="submit" value="Register" />
        </p>
      </form>
    </div>
  )
}

export default Register

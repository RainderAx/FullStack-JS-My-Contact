import { useState } from 'react'
import './App.css'
import axios from "axios"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:5000/auth/login", { email, password })
            console.log(response.data)

            const token = response.data.token

            if (token) {
                localStorage.setItem("token", token)
                console.log("Token sauvegardé dans le localStorage")
            } else {
                console.error("Token non reçu")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form id="login" onSubmit={handleSubmit}>
                <h1>Login</h1>

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
                    <input type="submit" value="Login" />
                </p>
            </form>
        </div>
    )
}

export default Login

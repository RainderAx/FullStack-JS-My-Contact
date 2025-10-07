import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password })
            const token = response.data.token

            if (token) {
                // Sauvegarde du token
                localStorage.setItem('authToken', token)
                // Config axios pour toutes les requêtes futures
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

                // Redirection vers le dashboard
                navigate('/dashboard')
            } else {
                alert('Token non reçu, veuillez réessayer.')
            }
        } catch (error) {
            console.error(error)
            alert('Erreur lors de la connexion. Vérifiez vos identifiants.')
        }
    }

    return (
        <div className="login-container">
            <form id="login" onSubmit={handleSubmit}>
                <h1>Login</h1>

                <p className="item">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </p>

                <p className="item">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </p>

                <p className="item">
                    <button type="submit">Login</button>
                </p>
            </form>
        </div>
    )
}

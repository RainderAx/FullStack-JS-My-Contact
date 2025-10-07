import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem('authToken')

    // Si le token existe, on rend le composant enfant
    // Sinon, redirige vers la page de login
    return token ? children : <Navigate to="/" replace />
}

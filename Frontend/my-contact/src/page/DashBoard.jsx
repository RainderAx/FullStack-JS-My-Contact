import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const navigate = useNavigate()

    const handleLogout = () => {
        // Supprime le token
        localStorage.removeItem('authToken')
        delete axios.defaults.headers.common['Authorization']

        // Redirige vers le login
        navigate('/')
    }

    return (
        <div className="dashboard-container">
            <h1>Tableau de bord</h1>
            <p>Bienvenue sur votre espace sécurisé !</p>
            <button onClick={handleLogout}>Se déconnecter</button>
        </div>
    )
}

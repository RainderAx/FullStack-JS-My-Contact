import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './page/Login.jsx';
import Register from './page/Register.jsx';
import HomePage from './page/HomePage.jsx';
// import PrivateRoute from './page/PrivateRoute.jsx';
// import Dashboard from './page/DashBoard.jsx';

import './App.css';

function App() {
    return (
        <>
            <Router>

                <div>

                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>

                    {/* <Route path="/dashboard" element={<PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>} />
                     */}
                </div>

            </Router>

        </>
    );
}

export default App;
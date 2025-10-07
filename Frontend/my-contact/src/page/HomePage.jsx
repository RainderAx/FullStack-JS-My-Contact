import React, { useState } from 'react';

const HomePage = () => {
    const [texte, setTexte] = useState('My Contact');

    const changerTexteAuSurvole = () => {
        setTexte('Bienvenue sur My Contact');
    };
    const reinitialiserTexte = () => {
        setTexte('My Contact');
    };

    return (
        <div className='container'>
            <div>
                <h1 onMouseOver={changerTexteAuSurvole} onMouseOut={reinitialiserTexte}>
                    {texte}
                </h1>
            </div>

            <div>
                <a href='/register'>Register</a> |
                <a href='/login'>Login</a>
            </div>
        </div>
    );
};

export default HomePage;
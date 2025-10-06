"use strict";
const express = require("express");
const app = express();
const { connectDB } = require("./db");

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(); // Toujours avant d'utiliser les variables d'environnement

const requireAuth = require('./middlewares/auth.middleware');

const { swaggerUi, swaggerSpec } = require('./swagger');

app.use(express.json());
app.use(cors());

connectDB();

// route test
app.get("/", (req, res) => res.send("Hello World!"));
// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// user routes
const userRoutes = require('./views/userRoutes');
app.use('/auth', userRoutes);
app.get('/profil', requireAuth, (req, res) => {
    res.json({ message: 'Route protégée', user: req.user });
});

//Contact routes
const contactRoutes = require('./views/contactRoutes');
app.use('/auth', requireAuth, contactRoutes);

// Récupérer les contacts de l'utilisateur connecté
app.get('/addContact', async (req, res) => {
    res.json({ message: 'Route protégée', user: req.user });
});



// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
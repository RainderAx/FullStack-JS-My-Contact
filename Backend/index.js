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
const userContact = require('./views/contactRoutes');
app.get('/contact', async (req, res) => {
    try {
        const contacts = await userContact.getContacts(req.user?.id);
        res.json(contacts);
    } catch (error) {
        console.error("Erreur lors de la récupération des contacts:", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});



// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
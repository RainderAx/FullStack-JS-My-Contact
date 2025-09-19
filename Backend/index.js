"use strict";
const express = require("express");
const app = express();
const { connectDB } = require("./db");

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(); // Toujours avant d'utiliser les variables d'environnement

app.use(express.json());
app.use(cors());

connectDB();

// route test
app.get("/", (req, res) => res.send(""));

// user routes
const userRoutes = require('./views/userRoutes');
app.use('/api', userRoutes);

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
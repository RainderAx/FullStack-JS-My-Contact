"use strict";
const express = require("express");
const app = express();
const router = express.Router();

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(); // Toujours avant d'utiliser les variables d'environnement

app.use(express.json());
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

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
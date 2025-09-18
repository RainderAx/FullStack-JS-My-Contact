"use strict";
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
const { connectDB, getDB } = require("./db.js");

dotenv.config();

app.use(express.json());
app.use(cors());

// route test
app.get("/", (req, res) => res.send(""));

// Exemple : ajouter un utilisateur
app.post("/users", async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection("users").insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exemple : récupérer tous les utilisateurs
app.get("/users", async (req, res) => {
  try {
    const db = getDB();
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lancer le serveur après connexion à la DB
connectDB().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`http://localhost:${process.env.PORT}`)
  );
});
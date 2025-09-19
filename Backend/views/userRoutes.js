const express = require('express');
const router = express.Router();
const { register } = require('../controllers/userController');
const { login } = require('../controllers/userController');

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Inscription d'un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur enregistré
 */
router.post('/register', register);



/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne un token JWT
 *       400:
 *         description: Email ou mot de passe incorrect
 */
router.post('/login', login);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route d'inscription
router.post('/register', userController.register);


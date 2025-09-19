const express = require('express');
const router = express.Router();
const { register } = require('../controllers/userController');
const { login } = require('../controllers/userController');

// Route d'inscription
router.post('/register', register);
router.post('/login', login);

module.exports = router;
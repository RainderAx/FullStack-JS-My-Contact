const express = require('express');
const router = express.Router();
const { addContact } = require('../controllers/contactController');

router.post('/addContact', addContact);

module.exports = router;
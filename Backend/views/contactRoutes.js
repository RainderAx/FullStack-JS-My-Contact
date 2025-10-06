const express = require('express');
const router = express.Router();
const { addContact } = require('../controllers/contactController');
const { getContact } = require('../controllers/contactController');

router.post('/addContact', addContact);
router.get('/getContact', getContact)

module.exports = router;
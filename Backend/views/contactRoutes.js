const express = require('express');
const router = express.Router();
const { addContact } = require('../controllers/contactController');
const { getContact } = require('../controllers/contactController');
const { updateContact } = require('../controllers/contactController');
const requireAuth = require('../middlewares/auth.middleware');

router.post('/addContact', addContact);
router.get('/getContact', getContact)
router.put('/updateContact/:contactId', requireAuth, updateContact);

module.exports = router;
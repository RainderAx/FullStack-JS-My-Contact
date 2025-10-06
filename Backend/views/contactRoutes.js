const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/auth.middleware');

const { addContact } = require('../controllers/contactController');
const { getContact } = require('../controllers/contactController');
const { updateContact } = require('../controllers/contactController');
const { deleteContact } = require('../controllers/contactController');


router.post('/addContact', addContact);
router.get('/getContact', getContact)
router.put('/updateContact/:contactId', requireAuth, updateContact);
router.delete('/deleteContact/:contactId', requireAuth, deleteContact);

module.exports = router;
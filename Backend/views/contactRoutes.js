const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/auth.middleware');

const { addContact, getContact, updateContact, deleteContact } = require('../controllers/contactController');

/**
 * @swagger
 * /api/addContact:
 *   post:
 *     summary: Ajouter un contact
 *     tags:
 *       - Contacts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phoneNumber
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Jean
 *               lastName:
 *                 type: string
 *                 example: Dupont
 *               phoneNumber:
 *                 type: string
 *                 example: "0601020304"
 *     responses:
 *       201:
 *         description: Contact ajouté avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/addContact', addContact);

/**
 * @swagger
 * /api/getContact:
 *   get:
 *     summary: Récupérer tous les contacts
 *     tags:
 *       - Contacts
 *     responses:
 *       200:
 *         description: Liste des contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *       500:
 *         description: Erreur serveur
 */
router.get('/getContact', getContact);

/**
 * @swagger
 * /api/updateContact/{contactId}:
 *   put:
 *     summary: Mettre à jour un contact
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact mis à jour avec succès
 *       404:
 *         description: Contact non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/updateContact/:contactId', requireAuth, updateContact);

/**
 * @swagger
 * /api/deleteContact/{contactId}:
 *   delete:
 *     summary: Supprimer un contact
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact à supprimer
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès
 *       404:
 *         description: Contact non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/deleteContact/:contactId', requireAuth, deleteContact);

module.exports = router;
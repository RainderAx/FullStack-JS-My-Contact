const Contact = require('../models/Contact');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function upperLastName(lastName) {
    try {
        const str = lastName.toUpperCase();
        return str;
    } catch (error) {
        console.error("le nom n'a pas été mis en majuscule");
        throw error;
    }
}

async function verifyNumber(str, res) {
    const length = str.length;
    try {
        if (length >= 10 && length <= 20) {
            console.log("Taille du numéro de téléphone ok ");
        } else {
            res.status(400).json({ message: "Numéro de téléphone invalide" });
        }
    } catch (error) {
        console.error("Erreur lors de la vérification du numéro");
        res.status(500).json({ message: 'Erreur serveur' });
        throw error;
    }
}

async function upperFirstName(firstName) {
    try {
        const str = firstName.toLowerCase();
        return str.charAt(0).toUpperCase() + str.slice(1);
    } catch (error) {
        console.error("le prénom n'a pas été mis en majuscule");
        throw error;
    }
}

async function addContact(req, res) {
    const { firstName, lastName, phoneNumber } = req.body;
    const userId = req.user._id;
    try {
        const Capitale = await upperFirstName(firstName);
        const UpperName = await upperLastName(lastName);
        await verifyNumber(phoneNumber, res);

        const newContact = new Contact({
            firstName: Capitale,
            lastName: UpperName,
            phoneNumber,
            userId: userId
        });
        await newContact.save();
        res.status(201).json({ message: 'Contact ajouté avec succès', contact: newContact });
    } catch (error) {
        console.error("Erreur lors de l'ajout du contact", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}
module.exports = {
    addContact
};
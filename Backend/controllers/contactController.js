const Contact = require('../models/Contact');
const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function upperLastName(lastName) {
    try {
        const str = lastName.toUpperCase();
        console.log("str:", str);
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
        console.log("str:", str);
        return str.charAt(0).toUpperCase() + str.slice(1);
    } catch (error) {
        console.error("le prénom n'a pas été mis en majuscule");
        throw error;
    }
}

async function addContact(req, res) {
    console.log("Ajout d'un contact");
    console.log("req.body:", req.body);
    const { firstName, lastName, phoneNumber } = req.body;
    console.log("req.user:", req.user);
    const userId = req.user.id;

    try {
        const Capitale = await upperFirstName(firstName);
        const UpperName = await upperLastName(lastName);
        await verifyNumber(phoneNumber, res);
        console.log("USER:", req.user);
        console.log("userId:", userId);

        const newContact = new Contact({
            firstName: Capitale,
            lastName: UpperName,
            phoneNumber,
            user: userId

        });

        await newContact.save();

        res.status(201).json({ message: 'Contact ajouté avec succès', contact: newContact });

    } catch (error) {
        console.error("Erreur lors de l'ajout du contact", error);
        res.status(500).json({
            message: 'Erreur serveur',
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber
        });
    }
}

async function getContact(req, res) {

    try {
        const userId = req.user.id;
        const contacts = await Contact.find({ user: userId })
            .select('firstName lastName phoneNumber');
        res.status(200).json({ contacts });


    } catch (error) {
        console.error("Erreur lors de la récupération des contacts", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}


module.exports = {
    addContact,
    getContact

};
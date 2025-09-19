const Contact = require('../models/Contact');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function upperLastName(req, res) {
    const { lastName } = req.body;
    try {
        const UpperLastName = lastName.toUpperCase();

        res.status(201).json({ message: 'nom mis à jour', UpperLastName });
    } catch (error) {
        console.error("le nom n'a pas été mis en majuscule");
        res.status(500).json({ message: 'Erreur serveur' });
        throw error;
    }
};
async function verifyNumber(req, res) {
    const { phoneNumber } = req.body;
    const length = phoneNumber.length;

    try {
        if (length >= 10 && length <= 20) {
            console.log("Taille du numéro de téléphone ok ")
        } else {
            res.status(400).json({ message: "Numéro de téléphone invalide" });
        }
    } catch (error) {
        console.error("le nom n'a pas été mis en majuscule");
        res.status(500).json({ message: 'Erreur serveur' });
        throw error;
    }

    async function upperFirstName(req, res) {
        const { firstName } = req.body;
        try {
            const str = firstName.toLowerCase();
            const Capitale = str.charAt(0).toUpperCase + str.slice(1);

            res.status(201).json({ message: 'nom mis à jour', Capitale });
        } catch (error) {
            console.error("le nom n'a pas été mis en majuscule");
            res.status(500).json({ message: 'Erreur serveur' });
            throw error;
        }


    };

    //        const NewLastName = new Contact({
    //           firstName,
    //           lastName: UpperLastName,
    //           phoneNumber,
    //        });

    //      await NewLastName.save();
};


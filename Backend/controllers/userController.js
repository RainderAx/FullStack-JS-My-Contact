const bcrypt = require('bcrypt');
const User = require('../models/User');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const saltRounds = 17;

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(password, salt);
        console.log('mot de passe hashé :', hashPassword);
        return hashPassword;
    } catch (error) {
        console.error('Erreur lors du hashage du mot de passe :', error);
        throw error;
    }
};


async function register(req, res) {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email })
            .exec();
        if (existingUser) {
            return res
                .status(400)
                .json({ message: 'Email déjà utilisé' });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

module.exports = {
    register
};

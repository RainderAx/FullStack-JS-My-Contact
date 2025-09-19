const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },

    phoneNumber: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Contact', contactSchema);
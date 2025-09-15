const mongoose = require('mongoose')
const { type } = require('os')
const pagination = require('mongoose-paginate-v2');
const { timeStamp } = require('console');


const locataireSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enum: ['homme', 'femme', 'autre'],
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    telephone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    codePostal: {
        type: Number,
    },
    coordonee: {
        type: String,
        required: true
    },
    piece: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        required: true
    }
},
{
    timeStamp: true
});
mongoose.plugin(pagination)
module.exports = mongoose.model('Locataires', locataireSchema);
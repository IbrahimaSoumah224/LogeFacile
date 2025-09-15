const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

const proprietaireSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    adresse:{
        type: String,
        required: true
    },
    telephone:{
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    genre: {
        type: String,
        enum: ['homme', 'femme']
    },
    ville: {
        type: String,
    },
    identification_fiscal:{
        type: String,
        required: true
    },
    photo:{
        type: String
    }
},
{
    timeStamp: true
})

mongoose.plugin(paginate)
module.exports = mongoose.model('Proprietaire', proprietaireSchema)
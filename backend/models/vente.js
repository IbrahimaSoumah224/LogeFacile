const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

const venteSchema = mongoose.Schema({
    nom_vendeur: {
        type: String,
        required: true
    },
    prenom_vendeur: {
        type: String,
        required: true
    },
    adresse_vendeur:{
        type: String,
        required: true
    },
    telephone_vendeur:{
        type: Number,
        required: true,
        unique: true
    },
    email_vendeur: {
        type: String,
        required: true,
        unique: true
    },
    genre_vendeur: {
        type: String,
        enum: ['homme', 'femme']
    },
    ville_vendeur: {
        type: String,
    },
    photo_vendeur:{
        type: String
    },
    description_vente:{
        type: String
    },
    piece: {
        type: String
    }
})

mongoose.plugin(paginate)
module.exports = mongoose.model('Ventes', venteSchema)
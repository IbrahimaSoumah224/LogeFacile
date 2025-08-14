const mongoose = require('mongoose')
const pagination = require('mongoose-paginate-v2')

const promoteurSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    telephone: {
        type: Number,
        required: true,
        unique: true
    },
    ville: {
        type: String,
    },
    piece:{
        type: String,
        required: true,
        unique: true
    },
    genre:{
        type: String,
        enum: ['homme', 'femme', 'autre']
    }
})

mongoose.plugin(pagination)
module.exports = mongoose.model('Promoteurs', promoteurSchema)
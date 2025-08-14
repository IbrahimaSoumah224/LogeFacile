const mongoose = require('mongoose')
const pagination = require('mongoose-paginate-v2')
const locataire = require('./locataire')



const historiqueSchema = mongoose.Schema({
    id_locataire: {
        type: mongoose.Types.ObjectId,
        ref: "Locataires"
    },
    id_proprietaire: {
        type: mongoose.Types.ObjectId,
        ref: "Proprietaires"
    },
    id_promoteur:{
        type: mongoose.Types.ObjectId,
        ref: "Promoteurs"
    }
})
mongoose.plugin(pagination)

module.exports = mongoose.model('Historiques', historiqueSchema)
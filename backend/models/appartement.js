const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const appartementSchema = mongoose.Schema({
    image:{
        type: String,
        required: true
    },
    localisation: {
        type: String,
        required: true,
    },
    taille:{
        type: String,
        required: true
    },
    mensualite:{
        type: String,
        required: true
    },
    equipement_disponible:{
        type: String,
        required: true
    },
    contrat_juridique:{
        type: String,
        required: true
    },
    duree_location:{
        type: String,
        required: true
    },
    type_logement: {
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    commentaire_locataire_precedent:{
        type: String,
    },
    statut: {
        type: String,
        required: true
    },
    caution:{
        type: String,
        required: true
    }
},
{
    timeStamp: true
})

mongoose.plugin(mongoosePaginate)
module.exports = mongoose.model('Appartements', appartementSchema)
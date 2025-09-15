const mongoose = require('mongoose')
const pagination = require('mongoose-paginate-v2')

const publicationSchema = mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    type_publication:{
        type: String,
        required: true,
        enum: ['bureau', 'magasin', 'appartement', 'parcelle', 'villa', 'chambre_hote']
    },
    taille:{
        type: String,
        required: true
    },
    service_annexe_inclus:{
        type: String,
        enum: ["oui", "non"]
    },
    localisation:{
        type: String,
        required: true,
        enum: ['commune_urbaine', 'quartier', 'secteur']
    },
    condition_financiere:{
        type: String,
        required: true
    },
    temps_occupation:{
        type: String,
        required: true
    },
    caution:{
        type: String,
        required: true
    },
    chambre_hote:{
        type: String,
        enum: ["oui", "non"]
    },
    villa: {
        type: String,
        enum: ["oui", "non"]
    },
    parcelle: {
        type: String
    },
    photo:{
        type: String,
        required: true
    },
    video:{
        type: String,
        required: true
    },
    date_disponibilite:{
        type: String,
        required: true
    },
    commentaire_ancien_locataire:{
        type: String
    },
    statut: {
        type: String,
        required: true
    },
    // id_promoteur:{
    //     type: mongoose.Types.ObjectId, 
    //     ref: "Promoteurs"
    // },
    // id_magasin:{
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'Magasins'
    // },
    // id_bureau: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Bureau'
    // }
},
{
    timeStamp: true
});

mongoose.plugin(pagination)
module.exports = mongoose.model('Publications', publicationSchema)
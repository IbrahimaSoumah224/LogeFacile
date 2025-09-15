const mongoose = require('mongoose')
const pagination = require('mongoose-paginate-v2')



const magasinSchema = mongoose.Schema({
    localisation: {
        type: String,
        enum: ['commune urbaine', 'quartier', 'secteur']
    },
    statut: {
        type: String,
        required: true,
        enum: ['libre', 'occupe']
    },
    mensualite:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: true
    },
    description: {
        type: String
    }
})
mongoose.plugin(pagination)

module.exports = mongoose.model('Magasins', magasinSchema)
const mongoose = require('mongoose')
const pagination = require('mongoose-paginate-v2')



const magasinSchema = mongoose.Schema({
    localisation: {
        type: String,
        required: true
    },
    statut: {
        type: String,
        required: true
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
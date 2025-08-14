const mongoose = require('mongoose')
const pagination = require('mongoose-paginate-v2')


const locationSchema = mongoose.Schema({
    type_location: {
        type: String,
        enum: ['magasins', 'bureau', 'villa', 'chambre_hote']
    },
    description: {
        type: String
    }
})

mongoose.plugin(pagination)
module.exports = mongoose.model('Locations', locationSchema)
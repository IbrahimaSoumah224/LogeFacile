const { string, required } = require('joi')
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const userShema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
},
{
    timeStamps: true
}
)

mongoose.plugin(mongoosePaginate)
module.exports = mongoose.model("User", userShema)
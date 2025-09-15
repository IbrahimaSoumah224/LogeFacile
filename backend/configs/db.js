const mongoose = require('mongoose');

require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(
            // "mongodb+srv://IbrahimaSoumah:Salmaibou150644@cluster0.vryncro.mongodb.net/LogeFacile?retryWrites=true&w=majority&appName=Cluster0"
            "mongodb://localhost:27017/logeFacile"
        )
        console.log('connexion reussi')
    } catch (error) {
        console.log("error", error)
    }
}

module.exports = connectDB;
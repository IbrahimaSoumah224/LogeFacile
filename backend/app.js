const express = require('express')
const connectDB = require('./configs/db')
const locataireRouter = require('./routes/locataireRouter')
const appartementRoute = require('./routes/appartementRouter')
const proprietaireRoute = require('./routes/proprietaireRouter')
require ('dotenv').config()


const PORT =process.env.PORT || 6000

const main = async()=>{
    const app = express()
    connectDB()

    app.use(express.json())


    app.use('/locataire', locataireRouter)
    app.use('/appartement', appartementRoute)
    app.use('/proprietaire', proprietaireRoute)

    app.listen(PORT, ()=>{
        console.log(`server is running in http://127.0.0.1:${PORT}`);
    })
}

main();
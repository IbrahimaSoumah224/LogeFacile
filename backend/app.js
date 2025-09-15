import express from 'express'
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose' // correction orthographe mongoose
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import connectDB from './configs/db.js'
import locataireRouter from './routes/locataireRouter.js'
import appartementRoute from './routes/appartementRouter.js'
import proprietaireRoute from './routes/proprietaireRouter.js'
import publicationRoute from './routes/publicationRouter.js'
import promoteurRoute from './routes/promoteurRouter.js'
import magasinRouter from './routes/magasinRouter.js'
import bureauRouter from './routes/bureauRouter.js'
import propertyRouter from './routes/propertyRouter.js'
import userRouter from './routes/userRouter.js'
import locationRouter from './routes/locationRouter.js'
import helmet from 'helmet'
// import { message } from './validators/publicationValidator.js' // si besoin, ajoute le .js aussi

const PORT = process.env.PORT || 5000

const main = async () => {
    const app = express()

    await connectDB() // await pour s'assurer que la BD est connectée avant de continuer

    app.use(express.json())


    //ce que j'ai utilise pour la video et l'interface admin
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({policy:  "cross-origin"}))
    app.use(morgan("common"))
    app.use(helmet())
    //se limite ici


    app.use(cors())

    app.use('/locataire', locataireRouter)
    app.use('/appartement', appartementRoute)
    app.use('/proprietaire', proprietaireRoute)
    app.use('/publication', publicationRoute)
    app.use('/promoteur', promoteurRoute)
    app.use('/magasin', magasinRouter)
    app.use('/bureau', bureauRouter)
    app.use('/proprietes', propertyRouter)
    app.use('/api/user', userRouter)
    app.use('/api', locationRouter)
    // app.post('/login', (req, res) =>{
    //     const {name, password} = req.body;

    //     if(name ==='admin' && password === '123456'){
    //         res.status(200).json({success: true, message: 'login successful'})
    //     }else
    //     {
    //         res.status(400).json({success: false, message: 'login failed'})
    //     }
    // })

    app.listen(PORT, () => {
        console.log(`Server is running on http://127.0.0.1:${PORT}`);
    })
}

main()
const magasin = require('../models/magasin')
const validationMagasin = require('../validators/magasinValidator')


const creerMagasin = async (req, res) => {
    try {
        const { error, value } = validationMagasin.validate(req.body, {
            abortEarly: false
        });

        if (error) {
            const messages = error.details.map((err) => err.message);
            return res.status(400).json({ errors: messages });
        }

        // Création en base
        const enregMagasin = await magasin.create(value);
        return res.status(201).json(enregMagasin);

    } catch (error) {
        console.error('Erreur serveur:', error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};



const trouverMagasin = async (req, res) => {
    try {
        const mag = await magasin.find();
        res.status(200).json(mag);
    } catch (error) {
        console.log(error)
    }
}

const trouverUnMagasin = async (req, res) => {
    try {
        const _id = req.params._id
        console.log(_id)
        const unMagasin = await magasin.findOne({ _id })
        res.status(201).json(unMagasin);
    } catch (error) {
        console.log(error)
    }
}

const modifierMagasin = async (req, res) => {
    try {
        let { localisation, statut, mensualite, photo, description } = req.body;
        const _id = req.params._id
        const modif = await magasin.findOneAndUpdate({ _id: _id },
            { localisation, statut, mensualite, photo, description }
        )
        res.status(200).json(modif);
    } catch (error) {
        console.log(error);
    }
}

const supprimerMagasin = async (req, res) => {
    try {
        const _id = req.params._id
        const suprMagasin = await magasin.findOneAndDelete({ _id })
        res.status(200).json(suprMagasin);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    creerMagasin,
    trouverMagasin,
    trouverUnMagasin,
    modifierMagasin,
    supprimerMagasin
}
const bureau = require('../models/bureau')
const validationBureau = require('../validators/bureauValidator')


const creerBureau = async (req, res) => {
    try {
        const { error, value } = validationBureau.validate(req.body, {
            abortEarly: false
        });

        if (error) {
            const messages = error.details.map((err) => err.message);
            return res.status(400).json({ errors: messages });
        }

        // Création en base
        const enregBureau = await bureau.create(value);
        return res.status(201).json(enregBureau);

    } catch (error) {
        console.error('Erreur serveur:', error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};



const trouverBureau = async (req, res) => {
    try {
        const bur = await bureau.find();
        res.status(200).json(bur);
    } catch (error) {
        console.log(error)
    }
}

const trouverUnBureau = async (req, res) => {
    try {
        const _id = req.params._id
        console.log(_id)
        const unBureau = await bureau.findOne({ _id })
        res.status(201).json(unBureau);
    } catch (error) {
        console.log(error)
    }
}

const modifierBureau = async (req, res) => {
    try {
        let { localisation, statut, mensualite, photo, description } = req.body;
        const _id = req.params._id
        const modif = await bureau.findOneAndUpdate({ _id: _id },
            { localisation, statut, mensualite, photo, description }
        )
        res.status(200).json(modif);
    } catch (error) {
        console.log(error);
    }
}

const supprimerBureau = async (req, res) => {
    try {
        const _id = req.params._id
        const suprBureau = await bureau.findOneAndDelete({ _id })
        res.status(200).json(suprBureau);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    creerBureau,
    trouverBureau,
    trouverUnBureau,
    modifierBureau,
    supprimerBureau
}
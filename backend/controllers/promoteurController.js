const promoteur = require('../models/promoteur')
const validationPromoteur = require('../validators/promoteurValidator')


const creerPromoteur = async (req, res) => {
    try {
        // Validation
        const { error, value } = validationPromoteur.validate(req.body, {
            abortEarly: false
        });

        if (error) {
            const messages = error.details.map((err) => err.message);
            return res.status(400).json({ errors: messages });
        }

        // Vérifier si email existe déjà
        const existingPromoteur = await promoteur.findOne({ email: value.email });
        if (existingPromoteur) {
            return res.status(409).json({ message: "Cet email est déjà utilisé." });
        }

        // Création en base
        const enregPromoteur = await promoteur.create(value);
        return res.status(201).json(enregPromoteur);

    } catch (error) {
        // Gestion des erreurs liées à MongoDB (doublons, validations)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(409).json({ message: "Email déjà existant." });
        }
        console.error('Erreur serveur:', error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};



const trouverPromoteur = async (req, res) => {
    try {
        const locat = await promoteur.find();
        res.status(200).json(locat);
    } catch (error) {
        console.log(error)
    }
}

const trouverUnPromoteur = async (req, res) => {
    try {
        const _id = req.params._id
        console.log(_id)
        const unLoc = await promoteur.findOne({ _id })
        res.status(201).json(unLoc);
    } catch (error) {
        console.log(error)
    }
}

const modigfierPromoteur = async (req, res) => {
    try {
        let { nom, prenom, adresse, email, telephone, ville, piece, genre } = req.body;
        const _id = req.params._id
        const modif = await promoteur.findOneAndUpdate({ _id: _id },
            { nom, prenom, adresse, email, telephone, ville, piece, genre }
        )
        res.status(200).json(modif);
    } catch (error) {
        console.log(error);
    }
}

const supprimerPromoteur = async (req, res) => {
    try {
        const _id = req.params._id
        const supr = await promoteur.findOneAndDelete({ _id })
        res.status(200).json(supr);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    creerPromoteur,
    trouverPromoteur,
    trouverUnPromoteur,
    modigfierPromoteur,
    supprimerPromoteur
}
const locataires = require('../models/locataire')


const creerLocataire = async (req, res) => {
    try {
        let { nom, prenom, genre, adresse, telephone, email, type, codePostal, coordonee, piece, photo, } = req.body;
        //const dataInsert = {nom, prenom, genre, adresse, telephone, email, type, codePostal, coordonee, piece, photo}

        const enregLocataire = await locataires.create({ nom, prenom, genre, adresse, telephone, email, type, codePostal, coordonee, piece, photo })
        res.status(201).json(enregLocataire);
    } catch (error) {
        console.log(error);
    }
}

const trouverLesLocataires = async (req, res) => {
    try {
        const locat = await locataires.find();
        res.status(200).json(locat);
    } catch (error) {
        console.log(error)
    }
}

const trouverUnLocataire = async (req, res) => {
    try {
        const _id = req.params._id
        console.log(_id)
        const unLoc = await locataires.findOne({ _id })
        res.status(201).json(unLoc);
    } catch (error) {
        console.log(error)
    }
}

const modifierLocataire = async (req, res) => {
    try {
        let { nom, prenom, genre, adresse, telephone, email, type, codePostal, piece, photo } = req.body;
        const _id = req.params._id
        const modif = await locataires.findOneAndUpdate({ _id: _id },
            { nom, prenom, genre, adresse, telephone, email, type, codePostal, piece, photo }
        )
        res.status(200).json(modif);
    } catch (error) {
        console.log(error);
    }
}

const suprimerLocataire = async (req, res) => {
    try {
        const _id = req.params._id
        const supr = await locataires.findOneAndDelete({ _id })
        res.status(200).json(supr);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    creerLocataire,
    trouverLesLocataires,
    trouverUnLocataire,
    modifierLocataire,
    suprimerLocataire
}
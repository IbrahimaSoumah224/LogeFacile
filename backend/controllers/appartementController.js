const locataires = require('../models/appartement')


const creerAppartement = async (req, res) => {
    try {
        let { image, localisation, taille, mensualite, equipement_disponible, contrat_juridique, duree_location, type_logement, description, commentaire_locataire_precedent, statut, caution} = req.body;
        //const dataInsert = {image, localisation, taille, mensualite, equipement_disponible, contrat_juridique, duree_location, type_logement, description, commentaire_locataire_precedent, statut}

        const enregLocataire = await locataires.create({ image, localisation, taille, mensualite, equipement_disponible, contrat_juridique, duree_location, type_logement, description, commentaire_locataire_precedent, statut , caution})
        res.status(201).json(enregLocataire);
    } catch (error) {
        console.log(error);
    }
}

const trouverLesAppartements = async (req, res) => {
    try {
        const locat = await locataires.find();
        res.status(200).json(locat);
    } catch (error) {
        console.log(error)
    }
}

const trouverUnAppartement = async (req, res) => {
    try {
        const _id = req.params._id
        console.log(_id)
        const unLoc = await locataires.findOne({ _id })
        res.status(201).json(unLoc);
    } catch (error) {
        console.log(error)
    }
}

const modifierAppartement = async (req, res) => {
    try {
        let { image, localisation, taille, mensualite, equipement_disponible, contrat_juridique, duree_location, type_logement, commentaire_locataire_precedent, statut, caution } = req.body;
        const _id = req.params._id
        const modif = await locataires.findOneAndUpdate({ _id:_id },
            { image, localisation, taille, mensualite, equipement_disponible, contrat_juridique, duree_location, type_logement, commentaire_locataire_precedent, statut, caution }
        )
        res.status(200).json(modif);
    } catch (error) {
        console.log(error);
    }
}

const suprimerAppartement = async (req, res) => {
    try {
        const _id = req.params._id
        const supr =await locataires.findOneAndDelete({_id})
        res.status(200).json(supr);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    creerAppartement,
    trouverLesAppartements,
    trouverUnAppartement,
    modifierAppartement,
    suprimerAppartement
}
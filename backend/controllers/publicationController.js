const publicationModel = require('../models/publication')
const validationPublication = require('../validators/publicationValidator')


const creerPublication = async (req, res) => {
    try {
        const { error, value } = validationPublication.validate(req.body, {
            abortEarly: false
        });
        if (error) {
            const message = error.details.map((err) => err.message)
            res.status(401).json(message)
        }
        const enregPublication = await publicationModel.create(value)

        res.status(201).json(enregPublication);
    } catch (error) {
        console.log(error);
    }
}

const trouvrPublication = async (req, res) => {
    try {
        const publi = await publicationModel.find();
        res.status(200).json(publi);
    } catch (error) {
        console.log(error)
    }
}

const trouverUnePublication = async (req, res) => {
    try {
        const _id = req.params._id
        console.log(_id)
        const unePubli = await publicationModel.findOne({ _id })
        res.status(201).json(unePubli);
    } catch (error) {
        console.log(error)
    }
}

const modifierPublication = async (req, res) => {
    try {
        // Récupération de l'id dans req.params._id (supposé passé dans l'URL)
        const _id = req.params._id;

        // Récupère les champs à modifier dans req.body
        let {
            description, type_publication, taille, service_annexe_inclus, localisation, temps_occupation, 
            caution, chambre_hote, villa, parcelle, photo, video, date_disponibilite, commentaire_ancien_locataire, statut
        } = req.body;

        const modifPubli = await publicationModel.findOneAndUpdate(
            { _id: _id },
            {
                description, type_publication, taille, service_annexe_inclus, localisation, 
                temps_occupation, caution, chambre_hote, villa, parcelle,photo,video,date_disponibilite,commentaire_ancien_locataire,statut
            },
            { new: true }
        );
        if (!modifPubli) {
            return res.status(404).json({ message: "Publication non trouvée" });
        }
        res.status(200).json(modifPubli);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};


const supprimerPublication = async (req, res) => {
    try {
        const _id = req.params._id
        const supr = await publicationModel.findOneAndDelete({ _id })
        res.status(200).json(supr);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    creerPublication,
    trouverUnePublication,
    trouvrPublication,
    modifierPublication,
    supprimerPublication
}
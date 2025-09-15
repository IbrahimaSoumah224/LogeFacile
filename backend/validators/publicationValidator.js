const joi = require('joi')

const publicationValidator = joi.object({
    description: joi.string().required().max(1000).messages({
        "string.base": "le champ doit etre une chaine de caractere alphabetique",
        "string.empty": "le champ ne doit etre vide",
        "any.required": "la description du produit est obligatoire"
    }),
    type_publication: joi.string().required().valid("bureau", "magasin", "appartement", "parcelle", "villa", "chambre_hote").messages({
        "any.required": "veuillez choisir une localisation"
    }),
    taille: joi.string().required().messages({
        "any.required": "veuillez entrer la taille"
    }),
    service_annexe_inclus: joi.string().valid("oui", "non").messages({
        "any.required": "veuillez choisir une reponse"
    }),
    localisation: joi.string().required().valid("commune_urbaine", "quartier", "secteur").messages({
        "any.required": "veuillez choisir la localisation"
    }),
    condition_financiere: joi.string().required().messages({
        "any.required": "la condition financiere est requise"
    }),
    temps_occupation: joi.string().required().messages({
        "any.required": "le temps d'occupation est necessaire"
    }),
    caution: joi.string().required().messages({
        "any.required": "la caution est obligatoire"
    }),
    chambre_hote: joi.string().valid("oui", "non").messages({
        "any.required": "veuillez choisir une valeur"
    }),
    villa: joi.string().valid("oui", "non").messages({
        "any.required": "veuillez choisir une valeur"
    }),
    parcelle: joi.string().messages({
        "any.required": "le champs est requis"
    }),
    photo: joi.string().messages({
        "any.required": "le champ est requis"
    }),
    video: joi.string().messages({
        "any.required": "la video est requise"
    }),
    date_disponibilite: joi.string().messages({
        "any.required": "le champ est requis"
    }),
    commentaire_ancien_locataire: joi.string().messages({
        "string.base": "le champ doit etre une chaine de caractere"
    }),
    statut: joi.string().messages({
        "string.any": "le champ doit etre renseigne"
    })
})


module.exports = publicationValidator
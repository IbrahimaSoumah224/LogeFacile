const joi = require('joi')


const magasinValidator = joi.object({
    localisation: joi.string().required().valid('commune urbaine', 'quartier','secteur').messages({
        "string.base": "le champ doit etre une chaine de caractere alphabetique",
        "string.empty": "le champ ne doit etre vide",
        "any.required": "la description du produit est obligatoire"
    }),
    statut: joi.string().required().valid('libre', 'occupe').messages({
        "string.base": "le champ doit etre une chaine de caractere alphabetique",
        "string.empty": "le champ ne doit etre vide",
        "any.required": "la description du produit est obligatoire"
    }),
    mensualite: joi.string().required().messages({
        "string.base": "le champ doit etre une chaine de caractere alphabetique",
        "string.empty": "le champ ne doit etre vide",
        "any.required": "la description du produit est obligatoire"
    }),
    photo: joi.string().required().messages({
        "string.base": "le champ doit etre une chaine de caractere alphabetique",
        "string.empty": "le champ ne doit etre vide",
        "any.required": "la description du produit est obligatoire"
    }),
    description: joi.string().messages({
        "string.base": "le champ doit etre une chaine de caractere alphabetique",
        "string.empty": "le champ ne doit etre vide",
        "any.required": "la description du produit est obligatoire"
    })
})

module.exports = magasinValidator
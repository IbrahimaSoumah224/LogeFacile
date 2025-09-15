const joi = require('joi')

const promoteurValidator = joi.object({
    nom: joi.string().min(3).max(15).messages({
        "string.base": "le champ est une chaine de caractere",
        "any.required": "le champ doit etre renseigne"
    }),
    prenom: joi.string().min(3).max(15).messages({
        "string.base": "le champ est une chaine de caractere",
        "any.required": "le champ doit etre renseigne"
    }),
    adresse: joi.string().messages({
        "any.required": "le champ doit etre renseigne",
        "string.base": "le champ est une chaine de caractere",
    }),
    email: joi.string().required().messages({
        'string.base': `"email" doit être une chaine de caractères`,
    }),
    telephone: joi.string().required().messages({
        'string.base': `"telephone" doit être une chaîne de caractères`,
    }),
    ville: joi.string().messages({
        "any.required": "le champ doit etre renseigne",
        "string.base": "le champ est une chaine de caractere",
    }),
    piece: joi.string().messages({
        "any.required": "le champ doit etre renseigne",
        "string.base": "le champ est une chaine de caractere",
    }),
    genre: joi.string().valid("homme", "femme", "autre").messages({
        "any.required": "le champ doit etre renseigne",
    })
})


module.exports = promoteurValidator
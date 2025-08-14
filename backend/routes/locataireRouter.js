const locataireController = require('../controllers/locataireController')
const express = require('express')

const route = express.Router()

route.post('/', locataireController.creerLocataire)
route.get('/', locataireController.trouverLesLocataires)
route.get('/:_id', locataireController.trouverUnLocataire)
route.put('/:_id', locataireController.modifierLocataire)
route.delete('/:_id', locataireController.suprimerLocataire)

module.exports = route;
const appartementController = require('../controllers/appartementController')
const express = require('express')
const { route } = require('./locataireRouter')
const routes = express.Router()


routes.post('/', appartementController.creerAppartement)
routes.get('/:_id', appartementController.trouverUnAppartement)
routes.get('/', appartementController.trouverLesAppartements)
routes.put('/:_id', appartementController.modifierAppartement)
routes.delete('/:_id', appartementController.suprimerAppartement)

module.exports = routes;
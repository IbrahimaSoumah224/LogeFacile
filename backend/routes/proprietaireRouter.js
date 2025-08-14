const proprietaireController = require('../controllers/proprietaireController')
const express = require('express');
const { route } = require('./locataireRouter');
const routes = express.Router()


routes.post('/', proprietaireController.creerProprietaire)
routes.get('/', proprietaireController.trouverLesProprietaire)
routes.get('/:_id', proprietaireController.trouverUnProprietaire)
routes.put('/:_id', proprietaireController.modifierProprietaire)
routes.delete('/:_id', proprietaireController.supprimerProprietaire)


module.exports = routes;
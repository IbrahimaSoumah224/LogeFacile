const magasinController = require('../controllers/magasinController')
const express = require('express')
const { route } = require('./locataireRouter')
const Router = express.Router()

Router.post('/', magasinController.creerMagasin)
Router.get('/', magasinController.trouverMagasin)
Router.get('/:_id', magasinController.trouverUnMagasin)
Router.put('/:_id', magasinController.modifierMagasin)
Router.delete('/:_id', magasinController.supprimerMagasin)


module.exports = Router
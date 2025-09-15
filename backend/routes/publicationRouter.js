const publicationController = require('../controllers/publicationController')
const express = require('express')
const Router = express.Router()



Router.post('/', publicationController.creerPublication)
Router.get('/', publicationController.trouvrPublication)
Router.get('/:_id', publicationController.trouverUnePublication),
Router.put('/:_id', publicationController.modifierPublication),
Router.delete('/:_id', publicationController.supprimerPublication)


module.exports = Router;
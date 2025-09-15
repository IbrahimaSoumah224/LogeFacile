const bureauController = require('../controllers/bureauController')
const express = require('express')
const Router = express.Router()


Router.post('/', bureauController.creerBureau)
Router.get('/',bureauController.trouverBureau)
Router.get('/:_id', bureauController.trouverUnBureau)
Router.put('/:_id', bureauController.modifierBureau)
Router.delete('/:_id', bureauController.trouverUnBureau)

module.exports = Router;
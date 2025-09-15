const promoteurRoute = require('../controllers/promoteurController')
const express = require('express')
const { route } = require('./locataireRouter')
const Router= express.Router()


Router.post('/', promoteurRoute.creerPromoteur)
Router.get('/', promoteurRoute.trouverPromoteur)
Router.get('/:_id', promoteurRoute.trouverUnPromoteur)
Router.put('/:_id', promoteurRoute.modigfierPromoteur)
Router.delete('/:_id', promoteurRoute.supprimerPromoteur)

module.exports = Router;
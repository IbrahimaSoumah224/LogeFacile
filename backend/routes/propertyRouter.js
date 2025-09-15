const express = require('express')
const router = express.Router()
const propertyController = require('../controllers/PropertyController')
const {authenticate, requireAdmin} = require('../middlewares/auth')
const { route } = require('./locataireRouter')


router.get('/properties', authenticate, requireAdmin, propertyController.getAllProperties)
router.post('/properties', authenticate, requireAdmin, propertyController.createProperty)
router.put('/properties', authenticate, requireAdmin, propertyController.updateProperty)
router.delete('/properties', authenticate, requireAdmin, propertyController.deleteProperty)
router.get('/dashboard/stats', authenticate, requireAdmin, propertyController.getStats)

module.exports = router
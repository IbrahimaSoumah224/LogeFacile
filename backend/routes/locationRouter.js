const locationController = require('../controllers/locationController')
const express = require('express')
const router = express.Router()

router.post('/', locationController)

module.exports = router
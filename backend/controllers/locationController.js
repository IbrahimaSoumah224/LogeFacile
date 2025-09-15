// routes/location.js
const express = require('express');
const router = express.Router();
const LocationRequest = require('../models/location'); // Modèle Mongoose

router.post('/book', async (req, res) => {
  try {
    const { propertyId, locataire } = req.body;
    const newLoc = new LocationRequest({ propertyId, ...locataire });
    await newLoc.save();
    res.status(201).json({ message: 'Location demandée' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;

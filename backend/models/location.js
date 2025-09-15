const mongoose = require('mongoose');

const LocationRequestSchema = new mongoose.Schema({
  propertyId: { type: String, required: true },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  budget: String,
  moveInDate: Date,
  message: String,
  financingNeeded: Boolean,
  visitPreference: String,
});

module.exports = mongoose.model('LocationRequest', LocationRequestSchema);

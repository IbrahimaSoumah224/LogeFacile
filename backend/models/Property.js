const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const propertyShema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  prix: { type: Number, required: true },
  type: {
    type: String,
    enum: ["vente", "location", "parcelle", "achat", "promoteur"],
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "sold", "rented"],
    default: "available",
  },
  location: { type: String, required: true },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  area: { type: Number },
  images: [{ type: String }],
  features: [{ type: String }],
},
{
    timeStamp: true
}
);

module.exports = mongoose.model("Property", propertyShema);

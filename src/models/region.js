const mongoose = require('mongoose');
const base = require('./base_schema');

const RegionSchema = base({
  crest: { type: String },
  realm: { type: String },
  capital: { type: String },
  continent: { type: String },
  sub_regions: [],
  border_data: [],
  square_mileage: { type: Number },
  neighbors: [],
  population: { type: Number },
  climate: { type: String },
  biome: { type: String },
  residents: []
});

const Region = mongoose.model('Region', RegionSchema);

module.exports = Region;
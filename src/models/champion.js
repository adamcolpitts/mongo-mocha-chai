const mongoose = require('mongoose');

const ChampionSchema = require('./sentient_being_schema');
ChampionSchema.add({
  sub_category: { type: String, default: 'CHAMPION' }
});

const Champion = mongoose.model('Champion', ChampionSchema);

module.exports = Champion;

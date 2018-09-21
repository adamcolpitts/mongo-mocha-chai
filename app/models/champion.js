const mongoose = require('mongoose');

const ChampionSchema = require('./sentient_being_schema');
ChampionSchema.add({
  sub_category: { type: String, default: 'CHAMPION' },
});

// Sets the created_at parameter equal to the current time
ChampionSchema.pre('save', function(next) {
  now = new Date();
  if(!this.created_at) {
    this.created_at = now;
  }
  next();
});

const Champion = mongoose.model('Champion', ChampionSchema);

module.exports = Champion;

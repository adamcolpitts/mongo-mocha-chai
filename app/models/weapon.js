const mongoose = require('mongoose');

const WeaponSchema = require('./object_schema');
WeaponSchema.add({
  category: { type: String, default: 'WEAPON' }
});

const Weapon = mongoose.model('Weapon', WeaponSchema);

module.exports = Weapon;

const mongoose = require('mongoose');
const base = require('./base_schema');

const SentientBeingSchema = base({
  gender: String,
  orientation: String,
  birth_event: String,
  death_event: String,
  other_life_events: [],
  parents: [],
  siblings: [],
  descendants: [],
  other_relatives: [],
  allies: [],
  enemies: [],
  romantic_partners: [],
  region_born: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region'
  },
  settlement_born: {type: String},
  current_residence: {type: String},
  places_lived: [],
  objects_owned: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Weapon'
  }],
  region_affiliations: [],
  group_affiliations: [],
  beliefs: [],
  actions_skills: []
});

module.exports = SentientBeingSchema;
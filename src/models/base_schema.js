const mongoose = require('mongoose');

module.exports = (paths) => {
  const schema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      validate: {
        validator: (name) => name.trim().length > 1,
        message: 'Name must be at least 2 characters.'
      },
      required: [true, 'Name is required.']
    },
    pronunciation: { type: String },
    aliases: [],
    related_actions: [],
    related_beliefs: [],
    related_creatures: [],
    related_beliefs: [],
    related_game_related: [],
    related_groups: [],
    related_landmarks: [],
    related_magic: [],
    related_meta: [],
    related_miscellaneous: [],
    related_objects: [],
    related_plants: [],
    related_realms: [],
    related_regions: [],
    related_sentient_beings: [],
    related_settlements: [],
    related_technologies: []
  });

  schema.add(paths);

  return schema;
};
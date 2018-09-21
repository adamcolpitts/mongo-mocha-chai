const mongoose = require('mongoose');
const base = require('./base_schema');

const ObjectSchema = base({
  owners: [],
  creation_event: { type: String },
  destruction_event: { type: String },
  size: { type: Number },
  weight: { type: Number },
  created_by: { type: String },
  destroyed_by: { type: String },
  value_in_currency: { type: Number }
});

module.exports = ObjectSchema;
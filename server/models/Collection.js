const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  id: String,
  items: Array,
  username: String
});

module.exports = mongoose.model('Collection', collectionSchema);

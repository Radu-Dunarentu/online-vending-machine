const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  id: String,
  quantity: Number,
  name: String,
  price: Number
});

module.exports = mongoose.model('Collection', collectionSchema);

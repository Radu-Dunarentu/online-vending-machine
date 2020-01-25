const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: String,
  quantity: Number,
  name: String,
  price: Number
});

module.exports = mongoose.model('Product', productSchema);

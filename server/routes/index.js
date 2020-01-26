const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const uuidv4 = require('uuid/v4');

const products = [
  {
  id: uuidv4(),
  quantity: 10,
  name: 'product 11',
  price: 30
},
  {
    id: uuidv4(),
    quantity: 10,
    name: 'product 12',
    price: 35
  },
  {
    id: uuidv4(),
    quantity: 10,
    name: 'product 13',
    price: 25
  },
  {
    id: uuidv4(),
    quantity: 10,
    name: 'product 14',
    price: 15
  },
  {
    id: uuidv4(),
    quantity: 10,
    name: 'product 15',
    price: 5
  },
  {
    id: uuidv4(),
    quantity: 10,
    name: 'product 16',
    price: 45
  },
  {
    id: uuidv4(),
    quantity: 10,
    name: 'product 17',
    price: 55
  },
  {
    id: uuidv4(),
    quantity: 10,
    name: 'product 18',
    price: 35
  }];

router.get('/generate-products', async(req, res) => {
  try {
    const data = await Product.insertMany(products);
    res.send(data);
  } catch(e) {
    console.log(e);
    res.status(500).send(e);
  }
});
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(products);
    res.send(products);
  } catch(e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const prod = await Product.findByIdAndDelete(req.params.id);
    if (!prod) res.status(404).send("No item found");
    res.status(200).send()
  }catch(e) {
    res.status(500).send(e);
  }
});

router.patch('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    const prod = await Product.save();
    res.send(prod);
  } catch (err) {
    res.status(500).send(err)
  }
});
router.post('/products/:id', async(req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.send(product);
  } catch(e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;

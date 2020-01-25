const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const products = [
  {
  id: '1',
  quantity: 10,
  name: 'product 1',
  price: 30
},
  {
    id: '2',
    quantity: 10,
    name: 'product 2',
    price: 35
  },
  {
    id: '3',
    quantity: 10,
    name: 'product 3',
    price: 25
  },
  {
    id: '4',
    quantity: 10,
    name: 'product 4',
    price: 15
  },
  {
    id: '5',
    quantity: 10,
    name: 'product 5',
    price: 5
  },
  {
    id: '6',
    quantity: 10,
    name: 'product 6',
    price: 45
  },
  {
    id: '7',
    quantity: 10,
    name: 'product 7',
    price: 55
  },
  {
    id: '8',
    quantity: 10,
    name: 'product 8',
    price: 35
  }];

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    console.log('products  = ', products);
    res.send(products);
  } catch(e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get('/products/:id', async(req, res) => {
  try {
    const product = new Product({
      name: 'name',
      id: req.params.id,
      quantity: 1,
      price: 35
    });
    await product.save();
    res.send(product);
  } catch(e) {
    console.log(e);
    res.status(500).send(e);
  }

});

router.post('/products/:id', (req, res) => {
  // do some in memory changes
  const product = products.find(p => p.id === req.params.id);
  if (product && product.quantity) {
    product.quantity -=1;
    res.json({data: products});
  } else {
    res.status(406).send({err: 'no more products left'})
  }

});
module.exports = router;

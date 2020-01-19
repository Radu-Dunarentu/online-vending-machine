const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
  res.json({data: [{
      id: 1,
      quantity: 10,
      name: 'product 1',
      price: 30
    },
    {
      id: 2,
      quantity: 10,
      name: 'product 2',
      price: 35
    },
    {
      id: 3,
      quantity: 10,
      name: 'product 3',
      price: 25
    },
    {
      id: 4,
      quantity: 10,
      name: 'product 4',
      price: 15
    },
    {
      id: 5,
      quantity: 10,
      name: 'product 5',
      price: 5
    },
    {
      id: 6,
      quantity: 10,
      name: 'product 6',
      price: 45
    },
    {
      id: 7,
      quantity: 10,
      name: 'product 7',
      price: 55
    },
    {
      id: 8,
      quantity: 10,
      name: 'product 8',
      price: 35
    }]});
});
module.exports = router;

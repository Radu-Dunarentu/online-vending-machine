const express = require('express');
const router = express.Router();

router.get('/mock', (req, res) => {
  res.json({x: 'cici are mere'});
});
module.exports = router;

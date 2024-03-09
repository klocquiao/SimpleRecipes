var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.json("Hello world!").status(200)
  next()
});


module.exports = router;

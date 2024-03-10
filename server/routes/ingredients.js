var express = require('express');
var router = express.Router();
const db = require('../models/ingredients')

router.get('/ingredients', async function(req, res, next) {
    try {
      const ingredients = await db.getIngredients()
      res.json(ingredients).status(200)
    }
    catch(err) {
      res.status(500).json({error: "Internal server error", message: err.message})
    }

    next()
  });


  router.post('/ingredients', async function(req, res, next) {
    try {
      console.log(req.body)
      await db.addIngredient(req.body.name)
      res.json('Success!').status(200)  
    }
    catch(err) {
      console.log("Failure")
      res.status(500).json({error: "Internal server error", message: err.message})
    }
    next()
  });

  module.exports = router;

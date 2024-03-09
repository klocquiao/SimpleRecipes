var express = require('express');
var router = express.Router();
const db = require('../models/db')

router.get('/recipes', async function(req, res, next) {
  try {
    const recipes = await db.getRecipes()
    res.json(recipes).status(200)
  }
  catch(err) {
    res.status(500).json({error: "Internal server error", message: err.message})
  }

  next()
});

router.get('/recipes/:id', async function(req, res, next) {
  let id = req.params.id
  try {
    const recipe = await db.getRecipeById(id)
    console.log(recipe)
    res.json(recipe).status(200)
  }
  catch(err) {
    res.status(500).json({error: "Internal server error", message: err.message})
  }
  next()
});

router.put('/recipes/:id', async function(req, res, next) {
  let id = req.params.id
  try {
    await db.updateRecipeById(id, req.body.name, req.body.lastUpdated, req.body.ingredients, req.body.directions)
    res.json('Success!').status(200)
  }
  catch(err) {
    res.status(500).json({error: "Internal server error", message: err.message})
  }
  next()
});

router.delete('/recipes/:id', async function(req, res, next) {
  let id = req.params.id
  try {
    let recipe = await db.deleteById(id)
    res.json(recipe).status(200)
  }
  catch(err) {
    res.status(500).json({error: "Internal server error", message: err.message})
  }
  next()
});

router.post('/recipes', async function(req, res, next) {
  try {
    console.log(req.body)
    await db.addRecipe(req.body.name, req.body.lastUpdated, req.body.ingredients, req.body.directions)
    res.json('Success!').status(200)  
  }
  catch(err) {
    console.log("Failure")
    res.status(500).json({error: "Internal server error", message: err.message})
  }
  next()
});

module.exports = router;

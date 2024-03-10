var express = require('express');
var router = express.Router();
const db = require('../models/recipes')
const ri = require('../models/recipeIngredients')

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
    await db.updateRecipeById(id, req.body.name, req.body.lastUpdated, req.body.directions)
    await ri.deleteIngredientToRecipe(id)

    let ingredients = req.body.ingredients
    for (i = 0; i < ingredients.length; i++) {
      if (ingredients[i] != 0) {
        await ri.addIngredientToRecipe(id, ingredients[i])
      }
    }    res.json('Success!').status(200)
  }
  catch(err) {
    res.status(500).json({error: "Internal server error", message: err.message})
  }
  next()
});

router.delete('/recipes/:id', async function(req, res, next) {
  let id = req.params.id
  try {
    await ri.deleteIngredientToRecipe(id)
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
    let id = await db.addRecipe(req.body.name, req.body.lastUpdated, req.body.directions)
    console.log(id)

    let ingredients = req.body.ingredients
    for (i = 0; i < ingredients.length; i++) {
      if (ingredients[i] != 0) {
        await ri.addIngredientToRecipe(id, ingredients[i])
      }
    }
    res.json('Success!').status(200)  
  }
  catch(err) {
    console.log("Failure")
    res.status(500).json({error: "Internal server error", message: err.message})
  }
  next()
});

module.exports = router;

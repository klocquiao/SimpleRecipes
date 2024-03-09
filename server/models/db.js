const { Pool } = require('pg');
var pool

pool = new Pool({
    user: 'postgres',
    host: 'db',
    password: 'root'
})

const helpers = {
    getRecipes: async function() {
        const res = await pool.query('SELECT * FROM recipes')
        return res.rows
    },

    getRecipeById: async function(id) {
        const res = await pool.query('SELECT * FROM recipes WHERE id = $1', [id])
        return res.rows[0]
    },

    deleteById: async function(id) {
        const q = 'DELETE FROM recipes WHERE id = $1'
        const res = await pool.query(q, [id])
    },

    updateRecipeById: async function(id, name, lastUpdated, ingredients, directions) {
        const q = 'UPDATE recipes SET name = $2, lastUpdated = $3, ingredients = $4, directions = $5 WHERE id = $1'
        const res = await pool.query(q, [id, name, lastUpdated, ingredients, directions])
    },


    addRecipe: async function(name, lastUpdated, ingredients, directions) {
        const q = 'INSERT INTO recipes(name, lastUpdated, ingredients, directions) VALUES($1, $2, $3, $4)'
        const res = await pool.query(q, [name, lastUpdated, ingredients, directions])
    },
    
    init: async function() {
        const q = 'CREATE TABLE IF NOT EXISTS recipes (id SERIAL PRIMARY KEY, name VARCHAR(50), lastUpdated DATE, ingredients VARCHAR(1000), directions VARCHAR(1000))'
        const res = await pool.query(q)
    }
}  

module.exports = helpers

// name: recipeName.value,
// lastUpdated: new Date(),
// ingredients: recipeIngredients.value,
// directions: recipeDirections.value,
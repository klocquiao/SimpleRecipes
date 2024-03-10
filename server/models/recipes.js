const { Pool } = require('pg');
var pool

pool = new Pool({
    user: 'postgres',
    host: 'db',
    password: 'root'
})

const helpers = {
    getRecipes: async function() {
        const res = await pool.query(`
        SELECT recipes.id, recipes.name, lastupdated, directions, ARRAY_AGG(ingredients.name) as ingredients
        FROM recipes 
        INNER JOIN recipeingredients ON recipes.id = recipeingredients.rid
        INNER JOIN ingredients ON recipeingredients.iid = ingredients.id
        GROUP BY recipes.id`)
        return res.rows
    },

    getRecipeById: async function(id) {
        const res = await pool.query(`
            SELECT recipes.id, recipes.name, lastupdated, directions, ARRAY_AGG(ingredients.id) as ingredients
            FROM recipes 
            INNER JOIN recipeingredients ON recipes.id = recipeingredients.rid
            INNER JOIN ingredients ON recipeingredients.iid = ingredients.id
            WHERE recipes.id = $1
            GROUP BY (recipes.id)` , [id])
        return res.rows[0]
    },

    deleteById: async function(id) {
        const q = 'DELETE FROM recipes WHERE id = $1'
        const res = await pool.query(q, [id])
    },

    updateRecipeById: async function(id, name, lastUpdated, directions) {
        const q = 'UPDATE recipes SET name = $2, lastUpdated = $3, directions = $4 WHERE id = $1'
        const res = await pool.query(q, [id, name, lastUpdated, directions])
    },

    addRecipe: async function(name, lastUpdated, directions) {
        const q = 'INSERT INTO recipes(name, lastUpdated, directions) VALUES($1, $2, $3) RETURNING id'
        const res = await pool.query(q, [name, lastUpdated, directions])
        return res.rows[0].id
    },
    
    init: async function() {
        const q = 'CREATE TABLE IF NOT EXISTS recipes (id SERIAL PRIMARY KEY, name VARCHAR(50), lastUpdated DATE, directions VARCHAR(1000))'
        const res = await pool.query(q)
    }
}  

module.exports = helpers

// name: recipeName.value,
// lastUpdated: new Date(),
// ingredients: recipeIngredients.value,
// directions: recipeDirections.value,
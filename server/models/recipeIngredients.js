const { Pool } = require('pg');
var pool

pool = new Pool({
    user: 'postgres',
    host: 'db',
    password: 'root'
})

const helpers = {
    init: async function() {
        const q = 'CREATE TABLE IF NOT EXISTS recipeingredients (rid INT REFERENCES recipes(id), iid INT REFERENCES ingredients(id), PRIMARY KEY (rid, iid))'
        const res = await pool.query(q)
    },

    getRecipeIngredients: async function() {
        const res = await pool.query('SELECT * FROM recipeingredients')
        return res.rows
    },
    
    addIngredientToRecipe: async function(recipeid, ingredientid) {
        const q = 'INSERT INTO recipeingredients (rid, iid) VALUES ($1, $2)'
        const res = await pool.query(q, [recipeid, ingredientid])
    },

    deleteIngredientToRecipe: async function(recipeid) {
        const q = 'DELETE FROM recipeingredients WHERE rid = $1'
        const res = await pool.query(q, [recipeid])
    }
}  

module.exports = helpers

const { Pool } = require('pg');
var pool

pool = new Pool({
    user: 'postgres',
    host: 'db',
    password: 'root'
})

const helpers = {
    getIngredients: async function() {
        const res = await pool.query('SELECT * FROM ingredients')
        return res.rows
    },

    getIngredientById: async function(id) {
        const res = await pool.query('SELECT * FROM ingredients WHERE id = $1', [id])
        return res.rows[0]
    },

    addIngredient: async function(name) {
        const q = 'INSERT INTO ingredients(name) VALUES($1)'
        const res = await pool.query(q, [name])
    },
    
    init: async function() {
        const q = 'CREATE TABLE IF NOT EXISTS ingredientsy (id SERIAL PRIMARY KEY, name VARCHAR(50))'
        const res = await pool.query(q)
    }
}  

module.exports = helpers
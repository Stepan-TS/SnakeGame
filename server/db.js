const Pool = require('pg').Pool;

const pool = new Pool({
    user:"postgres",
    password:"Tsiolkovskiy12",
    host:"localhost",
    port:5432,
    database:"game"
})

module.exports = pool;
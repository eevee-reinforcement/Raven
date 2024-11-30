const pg = require('pg');
require('dotenv').config()
const connection = process.env.PG_URI;

const client = new pg.Client({
    connectionString: connection,
});

client.connect()
    .then(() => console.log("Database connection successful ✔️"))
    .catch(err => console.error("Connection error", err.stack))
//Brought in as part of project template
//Helps figure out which database to look at (according to .env file)

//Bring in required 
const pg = require('pg');
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {
  // Heroku gives a url, not a connection object
  // https://github.com/brianc/node-pg-pool
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: { rejectUnauthorized: false },
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
} else {
  config = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host:
      "localhost" ||
      "app-4d31d795-fce1-46e0-a83d-5aed8f7749a6-do-user-8379856-0.b.db.ondigitalocean.com", // Server hosting the postgres database
    port: 5432 || 25060, // env var: PGPORT
    database: process.env.DATABASE_NAME, // CHANGED
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
}

// this creates the pool that will be shared by all other modules
const pool = new pg.Pool(config);

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;

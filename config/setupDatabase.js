const { Client } = require('pg');
const { pool } = require('../db/index.js');

(async () => {

  const placesTable = `
    CREATE TABLE IF NOT EXISTS places (
      id              INT     PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      street           VARCHAR(50) NOT NULL,      
      town         VARCHAR(50) NOT NULL,
      province       VARCHAR(50) NOT NULL,
      filename        VARCHAR(255),
      filepath          VARCHAR(255)
      
    );
  `

  try {
    const db = new Client({
      user: pool.PGUSER,
      host: pool.PGHOST,
      database: pool.PGDATABASE,
      password: pool.PGPASSWORD,
      port: pool.PGPORT
    });

    await db.connect();

    // Create tables on database
    await db.query(placesTable);

    await db.end();

  } catch(err) {
    console.log("ERROR CREATING ONE OR MORE TABLES: ", err);
  }

})();
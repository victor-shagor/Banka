import dotenv from 'dotenv';
import Pool from 'pg-pool';

dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_TEST,
});

const createTables = `
  CREATE TABLE IF NOT EXISTS users (
   ID SERIAL PRIMARY KEY,
   email VARCHAR(50),
   firstName CHAR(50),
   lastName CHAR(50),
   password VARCHAR,
   type CHAR(50),
   isAdmin BOOLEAN
  );
  CREATE TABLE IF NOT EXISTS accounts (
   ID SERIAL PRIMARY KEY,
   accountnumber INT,
   owner VARCHAR(50),
   type CHAR(50),
   status CHAR(50),
   balance FLOAT,
   createdon TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS transactions (
   ID SERIAL PRIMARY KEY,
   type VARCHAR,
   createdOn TIMESTAMP,
   accountNumber INT,
   cashier INT,
   amount FLOAT,
   newBalance FLOAT,
   OldBalance FLOAT
  );
`;

const createDatabaseTables = async () => {
  await pool.query(createTables).then(() => {
    console.log('Tables successfully created');
  });
};

createDatabaseTables();
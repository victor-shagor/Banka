import dotenv from 'dotenv';
import Pool from 'pg-pool';

dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_TEST,
});

const dropTables = `
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
`;

const dropDatabase = async () => {
  await pool.query(dropTables).then(() => {
    console.log('Tables successfully removed from Database');
  });
};

dropDatabase();
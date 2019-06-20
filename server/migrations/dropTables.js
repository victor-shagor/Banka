import pool from '../config'


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
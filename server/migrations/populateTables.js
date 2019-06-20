import dotenv from 'dotenv';
import Pool from 'pg-pool';

import Helper from '../helpers/helper';

dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_TEST,
});
const password = Helper.hashPassword('oladimeji1');
const password1 = Helper.hashPassword('adedoyin1');

const populate = `
INSERT INTO users (firstname, lastname, email, password, type, isadmin) VALUES ('abiola','victor','ojoabiola@gmail.com','${password}','staff',true);
INSERT INTO users (firstname, lastname, email, password, type, isadmin) VALUES ('doyin','adedokun','doyin@gmail.com','${password1}','client',false);
`;

const seedDatabase = async () => {
  await pool.query(populate).then(() => {
    console.log('tables Successfully Created');
  });
};

seedDatabase();
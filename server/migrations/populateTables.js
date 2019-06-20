import pool from '../config'
import Helper from '../helpers/helper';

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
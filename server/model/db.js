import Helper from "../helpers/helper";

const Users = [
{
 id: 1,
 firstName: 'Ojo',
 lastName: 'Abiola',
 email: 'ojoabiola@gmail.com',
 password: Helper.hashPassword('oladimeji1'),
 type: 'staff',
 isAdmin: true,
 created: new Date(),
 modified: new Date(),
},
{
 id: 2,
 firstName: 'Doyin',
 lastName: 'Adedokun',
 email: 'doyin@gmail.com',
 password: Helper.hashPassword('adedoyin1'),
 type: 'client',
 isAdmin: false,
 created: new Date(),
 modified: new Date(),
},
];


export default Users;
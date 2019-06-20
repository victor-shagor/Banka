import validator from 'validator';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import Pool from 'pg-pool';

import Helper from '../helpers/helper';

dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


const validate = {
  verifyInput(req, res, next) {
   const requiredFields = ['firstName', 'lastName', 'email', 'password'];
   const missingFields = [];
   requiredFields.forEach((fields) => {
     if (req.body[fields] === undefined) {
       missingFields.push(fields);
     }
   });
   if (missingFields.length !== 0) {
     return res.status(400).send({
       status: 400,
       message: 'The following field(s) is required',
       fields: missingFields,
     });
   }
   const {
     firstName, lastName, email, password,
   } = req.body;
   if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName)
   || !validator.isLength(firstName, { min: 3 }) || !validator.isLength(lastName, { min: 3 })) {
     return res.status(400).send({
       status: 400,
       message: 'Your names can only be in alphabets and must contain atleast three characters',
     });
   }
   if (!validator.isEmail(email)) {
     return res.status(400).send({
       status: 400,
       message: 'please enter a valid email address',
     });
   }
   if (!validator.isAlphanumeric(password) || !validator.isLength(password, { min: 8 })) {
     return res.status(400).send({
       status: 400,
       message: 'Your password must contain atleast 8 characters and must include atleast one number(symbols are not allowed)',
     });
   }
   pool.query('SELECT email FROM users WHERE email = $1 ', [email], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows[0]) {
      return res.status(409).send({
        status: 409,
        error: 'This email as already being used',
      });
    }
   next();
  })
 },
 verifySignin(req, res, next){
  const {password, email} = req.body
  if(password === undefined || email === undefined){
   return res.status(400).send({
    status: 400,
    error: 'Email and password is required',
  });
  }
  if(validator.isEmpty(password) || validator.isEmpty(email)){
   return res.status(400).send({
    status: 400,
    error: 'please provide email and password',
  });
  }
  pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
    if (error) {
      throw error;
    }
    if (!results.rows[0] || !Helper.comparePassword(results.rows[0].password, password)) {
      return res.status(404).send({
        status: 404,
        error: 'Email/password is incorrect',
      });
    }
    return next();
  })
 },
//  verifyFields(req, res, next){
//   const decoded = jwt.decode(req.headers['x-access-token'], {complete: true})
//   const email = acc.find(user => user.email === decoded.payload.userEmail)
//   if(email){
//    return res.status(409).send({
//     status: 409,
//     error: 'User already has an account',
//   });
//  }
//   const user = db.find(user => user.email === decoded.payload.userEmail)
//   if(!user){
//    return res.status(400).send({
//     status: 400,
//     error: 'User not registered',
//   });
//   }
//   next()
//  },
//  verifyAccount(req, res, next){
//    const {status} = req.body
//  const account = acc.find(user => user.accountNumber === parseInt(req.params.accountNumber))
//  if(!account){
//   return res.status(404).send({
//     status: 404,
//     error: 'Account not found',
//   });
//  }
//  if(status === undefined || status !=='active' && status !== 'dormant'){
//   return res.status(400).send({
//     status: 400,
//     error: 'Status is required and can only be active/dormant',
//   });
//  }
//  if(account.status === status){
//   return res.status(409).send({
//     status: 409,
//     error: `Account is already ${status}`,
//   });
//  }
//  next()
//  },
//  verifyRemoval(req, res, next){
//   const accountNumber = parseInt(req.params.accountNumber)
//   const account = acc.find(user => user.accountNumber === accountNumber)
//   if(!account){
//     return res.status(404).send({
//       status: 404,
//       error: 'Account not found',
//     });
//   }
//   next()
//  },
//  verifyDebit(req, res, next){
//    const amount = parseInt(req.body.amount)
//   const accountNumber = parseInt(req.params.accountNumber)
//   const account = acc.find(user => user.accountNumber === accountNumber)
//   if(amount === undefined || amount < 1){
//     return res.status(400).send({
//       status: 400,
//       error: 'amount is required and cannot be less than 1',
//     });
//   }
//   if(!account){
//     return res.status(404).send({
//       status: 404,
//       error: 'Account not found',
//     });
//   }
//   if(account.balance < amount){
//     return res.status(400).send({
//       status: 400,
//       error: 'Debit amount cannot be higher than the account balance',
//     }); 
//   }
//   next()
//  },
//  verifyCredit(req, res, next){
//   const amount = parseInt(req.body.amount)
//   const accountNumber = parseInt(req.params.accountNumber)
//   const account = acc.find(user => user.accountNumber === accountNumber)
//   if(amount === undefined || amount < 1){
//     return res.status(400).send({
//       status: 400,
//       error: 'amount is required and cannot be less than 1',
//     });
//   }
//   if(!account){
//     return res.status(404).send({
//       status: 404,
//       error: 'Account not found',
//     });
//   }
//   next()
//  }
 };
export default validate
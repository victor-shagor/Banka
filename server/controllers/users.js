import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Pool from 'pg-pool';

import Helper from '../helpers/helper';

dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const User = {
  create(req, res) {
    const {email, firstName, lastName, } = req.body.email
    const type = 'client'
    const isAdmin = false
    const password = Helper.hashPassword(req.body.password) 
    const data = {
      token: Helper.generateToken(email),
      firstName,
      lastName,
      email,
      password,
      type,
      isAdmin,
    };

    pool.query('INSERT INTO users (firstname, lastname, email, password, type, isadmin) VALUES ($1, $2, $3, $4, $5, $6)', [firstName, lastName, email, password, type, isAdmin], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send({
        status: 201,
        data,
      });
    });
  },
//   signin(req, res){
//     const data = db.find(user => user.email === req.body.email)
//     const token = Helper.generateToken(data.id, data.email)
//     data["token"] = token
//     res.status(200).send({
//       status: 200,
//       data,
//     });
//   },
//   accounts(req, res){
//   const decoded = jwt.decode(req.headers['x-access-token'], {complete: true})
//   const accountNumber = 1200 + acc.length+1;
//   const email = db.find(user => user.email === decoded.payload.userEmail)
//   const data = {
//     accountNumber,
//     firstName: email.firstName,
//     lastName: email.lastName,
//     email: email.email,
//     type:'savings',
//     status: 'draft',
//     openingBalance: 0,
//   }
//   acc.push(data)
//   res.status(201).send({
//     status: 201,
//     data,
//   });
//   },
//   activate(req, res){
//   const accountNumber = parseInt(req.params.accountNumber)
//   const {status} = req.body
//   const account = acc.find(user => user.accountNumber === accountNumber)
//   account.status = status
//   const data = {
//     accountNumber,
//     status: account.status
//   }
//   res.status(200).send({
//     status: 200,
//     data,
//   });
//   },
//   remove(req, res){
//     const accountNumber = parseInt(req.params.accountNumber)
//     const account = acc.find(user => user.accountNumber === accountNumber)
//     for(let i = 0; i<acc.length; i++){
//       if ( acc[i] === account) {
//         acc.splice(i, 1); 
//       }
//     }
//     return res.status(200).send({
//       status: 200,
//       message: 'Account successfully deleted'
//     });
//   },
//   debit(req, res){
//   const decoded = jwt.decode(req.headers['x-access-token'], {complete: true})
//   const {amount} = req.body
//   const accountNumber = parseInt(req.params.accountNumber)
//   const account = acc.find(user => user.accountNumber === accountNumber)
//   const newBalance = account.balance - parseInt(amount)
//   const id = tr.length+1
//   const data1 = {
//     id,
//     createdOn: new Date(),
//     type: 'debit',
//     accountNumber,
//     cashier: decoded.payload.userId,
//     amount,
//     oldBalance: account.balance,
//     newBalance,
//   }
//   account.balance = newBalance
//   tr.push(data1)
//  const data = {
//    transactionId: id,
//    accountNumber,
//    amount,
//    cashier: decoded.payload.userId,
//    transactionType: 'debit',
//    accountBalance: newBalance
//  }
//  return res.status(201).send({
//   status: 201,
//   data,
// });
//   },
//   credit(req, res){
//     const decoded = jwt.decode(req.headers['x-access-token'], {complete: true})
//     const {amount} = req.body
//     const accountNumber = parseInt(req.params.accountNumber)
//     const account = acc.find(user => user.accountNumber === accountNumber)
//     const newBalance = account.balance + parseInt(amount)
//     const id = tr.length+1
//     const data1 = {
//       id,
//       createdOn: new Date(),
//       type: 'Credit',
//       accountNumber,
//       cashier: decoded.payload.userId,
//       amount,
//       oldBalance: account.balance,
//       newBalance,
//     }
//     account.balance = newBalance
//     tr.push(data1)
//    const data = {
//      transactionId: id,
//      accountNumber,
//      amount,
//      cashier: decoded.payload.userId,
//      transactionType: 'Credit',
//      accountBalance: newBalance
//    }
//    return res.status(201).send({
//     status: 201,
//     data,
//   });
//     },
};
export default User;
import jwt from 'jsonwebtoken';

import Helper from '../helpers/helper';
import pool from '../config'

const User = {
  create(req, res) {
    const {email, firstName, lastName} = req.body
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
  signin(req, res){
  const {email} = req.body
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
      if (error) {
        throw error;
      }
      const {
        id, firstname, lastname, email, type, isadmin,
      } = results.rows[0];
      const token = Helper.generateToken(id, email) 
      const data = {token, id, firstname, lastname, email, type, isadmin}
      res.status(200).send({
        status: 200,
        data,
      });
    })
  },
  accounts(req, res){
  const decoded = jwt.decode(req.headers['x-access-token'], {complete: true})
  pool.query('SELECT * FROM accounts',(error, results) =>{
  pool.query('SELECT * FROM users where email =$1',[decoded.payload.userEmail], (error, result)=>{
    const accountNumber = 1200 + results.rows.length+1;
    const owner = result.rows[0].id
    const {firstname, lastname, email} = result.rows[0];
    const type = 'savings';
    const status = 'draft';
    const openingBalance = 0
  pool.query('INSERT INTO accounts (accountnumber, owner, type, status, balance, createdon) VALUES ($1, $2, $3, $4, $5, $6)', [accountNumber, owner, type, status, openingBalance, new Date()], (error, results) => {
  const data = {
    accountNumber,
    firstname,
    lastname,
    email,
    type,
    status,
    openingBalance,
  }
  res.status(201).send({
    status: 201,
    data,
  });
  })
})
})
  
  },
  activate(req, res){
  const accountNumber = parseInt(req.params.accountNumber)
  const {status} = req.body
  pool.query('UPDATE accounts SET status = $1 WHERE accountnumber = $2', [status, accountNumber], (error, result) => {
  if (error){
    throw error
  }
    const data = {
    accountNumber,
    status,
  }
  res.status(200).send({
    status: 200,
    data,
  });
})
  },
  remove(req, res){
    const accountNumber = parseInt(req.params.accountNumber)
    pool.query('DELETE FROM accounts WHERE accountnumber =$1', [accountNumber], (error, results) =>{
      return res.status(200).send({
        status: 200,
        message: `Account ${accountNumber} successfully deleted`
      });
    })
    
  },
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
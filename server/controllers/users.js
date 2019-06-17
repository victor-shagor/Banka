import jwt from 'jsonwebtoken';

import Helper from '../helpers/helper';
import db from '../model/db';
import acc from '../model/accounts';

const User = {
  create(req, res) {
    const id = db.length + 1;
    const email = req.body.email
    const data = {
      token: Helper.generateToken(id, email),
      id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email,
      password: Helper.hashPassword(req.body.password),
      type: 'client',
      isAdmin: false,
      created: new Date(),
      modified: new Date(),
    };

    db.push(data);
    res.status(201).send({
      status: 201,
      data,
    });
  },
  signin(req, res){
    const data = db.find(user => user.email === req.body.email)
    const token = Helper.generateToken(data.id, data.email)
    data["token"] = token
    res.status(200).send({
      status: 200,
      data,
    });
  },
  accounts(req, res){
  const decoded = jwt.decode(req.headers['x-access-token'], {complete: true})
  const accountNumber = 123450 + acc.length+1;
  const email = db.find(user => user.email === decoded.payload.userEmail)
  const data = {
    accountNumber,
    firstName: email.firstName,
    lastName: email.lastName,
    email: email.email
  }
  acc.push(data)
  res.status(201).send({
    status: 201,
    data,
  });
  }
};
export default User;
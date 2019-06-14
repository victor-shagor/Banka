import Helper from '../helpers/helper';
import db from '../model/db';

const User = {
  create(req, res) {
    const id = db.length + 1;
    const data = {
      token: Helper.generateToken(id),
      id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
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
    res.status(200).send({
      status: 200,
      data,
    });
  }
};
export default User;
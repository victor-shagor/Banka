import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import db from '../model/db';

dotenv.config();

const Auth = {
  verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({
        status: 401,
        error: 'Access Denied, Token is not provided',
      });
    }
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        return res.status(422).send({
          status: 422,
          error: 'Access Denied, The Token provided is invalid',
        });
      }
    });
    return next();
  },
  verifyAdmin(req, res, next){
    const decoded = jwt.decode(req.headers['x-access-token'], {complete: true})
    const admin = db.find(user => user.id === decoded.payload.userId)
    if(!admin){
      return res.status(422).send({
        status: 422,
        error: 'Access Denied, The Token provided is invalid',
      });
    }
    if(admin.isAdmin !==true){
      return res.status(403).send({
        status: 403,
        error: 'Only Admin/staff can access this route',
      });
    }
    return next()
   }
};

export default Auth;
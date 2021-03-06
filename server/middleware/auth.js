import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Pool from 'pg-pool';

import db from '../model/db';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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
      return next();
    });
  },
  verifyAdmin(req, res, next){
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
    const decoded = jwt.decode(token, {complete: true})
    pool.query('SELECT email, isadmin FROM users WHERE email = $1 ', [decoded.payload.userEmail], (error, results) => {
      if (error) {
        throw error;
      }
    if(results.rows[0].isadmin !== true){
      console.log(results.rows[0])
      return res.status(403).send({
        status: 403,
        error: 'Only Admin/staff can access this route',
      });
    }
    return next()
  })
   }
};

export default Auth;
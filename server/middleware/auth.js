import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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
};

export default Auth;
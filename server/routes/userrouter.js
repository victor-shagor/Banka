import express from 'express';
import User from '../controllers/users.js';
import validate from '../middleware/validation';
import Auth from '../middleware/auth';


const userRouter = express.Router();

const { verifyInput, verifySignin, verifyFields} = validate;
const { create, signin, accounts} = User;
const {verifyToken} = Auth;


userRouter.route('/api/v1/auth/signup').post(verifyInput, create);
userRouter.route('/api/v1/auth/signin').post(verifySignin, signin);
userRouter.route('/api/v1/accounts').post(verifyToken, verifyFields, accounts);


export default userRouter;

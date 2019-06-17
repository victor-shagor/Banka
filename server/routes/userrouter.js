import express from 'express';
import User from '../controllers/users.js';
import validate from '../middleware/validation';
import Auth from '../middleware/auth';


const userRouter = express.Router();

const { verifyInput, verifySignin, verifyFields, verifyAccount} = validate;
const { create, signin, accounts, activate} = User;
const {verifyToken, verifyAdmin} = Auth;


userRouter.route('/api/v1/auth/signup').post(verifyInput, create);
userRouter.route('/api/v1/auth/signin').post(verifySignin, signin);
userRouter.route('/api/v1/accounts').post(verifyToken, verifyFields, accounts);
userRouter.route('/api/v1/account/:accountNumber').patch(verifyToken, verifyAdmin, verifyAccount, activate)


export default userRouter;

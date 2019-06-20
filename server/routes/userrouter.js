import express from 'express';
import User from '../controllers/users.js';
import validate from '../middleware/validation';
import Auth from '../middleware/auth';


const userRouter = express.Router();

const { verifyInput, verifySignin, verifyFields, verifyAccount,verifyRemoval, verifyDebit, verifyCredit} = validate;
const { create, signin, accounts, activate, remove, debit, credit} = User;
const {verifyToken, verifyAdmin} = Auth;


userRouter.route('/api/v1/auth/signup').post(verifyInput, create);
userRouter.route('/api/v1/auth/signin').post(verifySignin, signin);
userRouter.route('/api/v1/accounts').post(verifyToken, verifyFields, accounts);
userRouter.route('/api/v1/account/:accountNumber').patch(verifyAdmin, verifyAccount, activate)
// userRouter.route('/api/v1/account/:accountNumber').delete(verifyAdmin, verifyRemoval, remove)
// userRouter.route('/api/v1/transactions/:accountNumber/debit').post(verifyAdmin, verifyDebit, debit);
// userRouter.route('/api/v1/transactions/:accountNumber/credit').post(verifyAdmin, verifyCredit, credit);


export default userRouter;

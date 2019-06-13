import express from 'express';
import User from '../controllers/users.js';
import validate from '../middleware/validation';


const userRouter = express.Router();

const { verifyInput} = validate;
const { create} = User;


userRouter.route('/api/v1/auth/signup').post(verifyInput, create);


export default userRouter;

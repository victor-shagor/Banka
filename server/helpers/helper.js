import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const Helper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  isValidPassword(password) {
    return /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,100}$/.test(password);
  },
  isValidNumber(amount) {
    return /^\d+$/.test(amount);
  },
  generateToken(id, email) {
    const token = jwt.sign({
      userId: id,
      userEmail:email
    },
    process.env.SECRET, { expiresIn: '7d' });
    return token;
  },
};

export default Helper;
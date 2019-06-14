import validator from 'validator';

import db from '../model/db';


const validate = {
  verifyInput(req, res, next) {
   const requiredFields = ['firstName', 'lastName', 'email', 'password'];
   const missingFields = [];
   requiredFields.forEach((fields) => {
     if (req.body[fields] === undefined) {
       missingFields.push(fields);
     }
   });
   if (missingFields.length !== 0) {
     return res.status(422).send({
       status: 422,
       message: 'The following field(s) is required',
       fields: missingFields,
     });
   }
   const {
     firstName, lastName, email, password,
   } = req.body;
   if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName)
   || !validator.isLength(firstName, { min: 3 }) || !validator.isLength(lastName, { min: 3 })) {
     return res.status(422).send({
       status: 422,
       message: 'Your names can only be in alphabets and must contain atleast three characters',
     });
   }
   if (!validator.isEmail(email)) {
     return res.status(422).send({
       status: 422,
       message: 'please enter a valid email address',
     });
   }
   const data = db.find(user => user.email === req.body.email);
    if (data) {
      return res.status(422).send({
        status: 422,
        error: 'This email as already being used',
      });
    }
   if (!validator.isAlphanumeric(password) || !validator.isLength(password, { min: 8 })) {
     return res.status(422).send({
       status: 422,
       message: 'Your password must contain atleast 8 characters and must include atleast one number(symbols are not allowed)',
     });
   }
   next();
 },
 };
export default validate
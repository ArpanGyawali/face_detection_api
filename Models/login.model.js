const mongoose = require('mongoose')
const validator = require('validator');

const Schema = mongoose.Schema

const loginSchema = new Schema({
   email: {
      type: String,
      required: [true, 'Enter an email address.'],
      unique: [true, 'Email address is taken.'],
      validate: [validator.isEmail, 'Enter a valid email address.']
   },
   password: {
      type: String,
      required: [true, 'Enter a password.'],
      minLength: [7, 'Password should be at least 7 characters'],
   }
})

const Login = mongoose.model('Login', loginSchema)

module.exports = Login


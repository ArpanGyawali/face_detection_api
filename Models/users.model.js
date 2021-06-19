const mongoose = require('mongoose')
const validator = require('validator');

const Schema = mongoose.Schema

const userSchema = new Schema({
   name: {
      type: String,
      required: [true, 'Enter a Username.'],
      unique: [true, 'Username is taken.'],
      validate: [validator.isAlphanumeric, 'Usernames may only have letters and numbers.']
   },
   email: {
      type: String,
      required: [true, 'Enter an email address.'],
      unique: [true, 'Email address is taken.'],
      validate: [validator.isEmail, 'Enter a valid email address.']
   },
   entries: {
      type: Number,
      default: 0
   },
   joined: {
      type: Date,
      default: new Date()
   }
})

const User = mongoose.model('User', userSchema)

module.exports = User


const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

require('dotenv').config();

const register = require('./Controllers/register')
const signin = require('./Controllers/signin')
const image = require('./Controllers/image')
const profile = require('./Controllers/profile')


const app = express()

app.use(express.json())
app.use(cors())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const connection = mongoose.connection;
connection.once('open', () => {
   console.log("MongoDB database connection established successfully");
})

let User = require('./Models/users.model')
let Login = require('./Models/login.model')

app.get('/', (req, res)=> {
   User.find()
      .then(users => res.status(200).json(users))
      .catch(err => res.status(400).json('Error: ' + err))
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, User, Login, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, User, Login, bcrypt, mongoose)})
app.get('/profile/:userID', (req, res)=> {profile.handleProfileGet(req, res, User)})
app.post('/profile/:userID', (req, res)=> {profile.handleProfilePost(req, res, User)})
app.delete('/profile/:userID', (req, res)=> {profile.handleProfileDelete(req, res, User)})
//to avoid depretiation warning
mongoose.set('useFindAndModify', false);
app.put('/image', (req, res)=> {image.handleImage(req, res, User)})
app.post('/imageApi', (req, res)=> {image.handleImgApi(req, res)})

const PORT = process.env.PORT || 3050;
app.listen(PORT, ()=> {
   console.log(`App is being listented on port ${PORT}`)
})







/*
/ --> res = this is working
/singin --> POST => success/fail
/register --> POST => newuser
/profile/:userID --> GET => user
/image -->PUT => user.entries
*/



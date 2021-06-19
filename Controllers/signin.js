const handleSignin = async (req, res, User, Login, bcrypt) => {
   const { email, password } = req.body
   const user = await User.findOne( {email: email})
   const login = await Login.findOne( {email: email})
   if(!login){
      res.status(400).json('Incorrect Email')
   }else{
      const isValid = await bcrypt.compare(password, login.password)
      if (!isValid){
         res.status(400).json('Incorrect Password')
      }else{
         res.status(200).json(user)
      }
   }
}

module.exports = {
   handleSignin
}
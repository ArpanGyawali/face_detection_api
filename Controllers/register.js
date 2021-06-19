//using transactions
const handleRegister = async (req, res, User, Login, bcrypt, mongoose) => {
   const session = await mongoose.startSession()
   session.startTransaction()
   try {
      const {email, password, name} = req.body
      if (password.length < 8){
         res.status(400).json('Password must be at least 8 characters')
      }
      else{
      const hash = await bcrypt.hash(password, 5);
         const newUser = await new User({
            name: name,
            email: email,
         }).save( {session: session} )

         await new Login({
            email: email,
            password: hash
         }).save( {session: session})

         await session.commitTransaction()
         session.endSession()
         res.status(200).json(newUser)
      }
   } catch (error) {
      await session.abortTransaction()
      session.endSession()
      //res.status(400).json(error)
      if (error.name === "ValidationError"){
         const {email, name} = error.errors
         if(email){
            res.status(400).json(email.message)
         }else if(name){
            res.status(400).json(name.message)
         }
      } else {
         if (error.keyValue.email){
            res.status(409).json('Email already taken')
         }
         else if(error.keyValue.name){
            res.status(409).json('Username already taken')
         }
      }
   }
}

module.exports = {
   handleRegister
}
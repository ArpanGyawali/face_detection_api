const handleProfileGet = (req, res, User) => {
   User.findById(req.params.userID)
      .then(user => res.status(200).json(user))
      .catch(err => res.status(404).send('user not found' + err))
} 

const handleProfilePost = (req, res, User) => {
   const { name, email } = req.body
   User.findById(req.params.userID)
      .then(user => {
         user.name = name;
         user.email = email;
         user.entries = user.entries;

         user.save()
            .then(() => res.json('User updated!'))
            .catch(err => res.status(400).json('unable to update' + err))
      })
      .catch(err => res.status(400).json(err))
}

const handleProfileDelete = (req, res, User) => {
   User.findByIdAndDelete(req.params.userID)
      .then(() => res.json('User deleated'))
      .catch(err => res.status(404).send('unable to delete' + err))
} 

module.exports = {
   handleProfileDelete,
   handleProfileGet,
   handleProfilePost
}
const  Clarifai = require('clarifai')

const app = new Clarifai.App({
   apiKey: '8f89ef6bad564954ac4e6c62c1938a86'
})

const handleImgApi = (req, res) => {
   app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(response => res.status(200).json(response))
      .catch(err => res.status(404).json(err))
}


const handleImage = (req, res, User) => {
   const {id} = req.body
   console.log(id)
   User.findByIdAndUpdate(id, { $inc: {entries : 1} } , {new: true})
      .then(user => res.status(200).json(user.entries))
      .catch(err => res.status(400).json('unable to update entries'))
}

module.exports = {
   handleImage,
   handleImgApi
}

const cloudinary = require('cloudinary').v2
const CloudinaryArray = {}
cloudinary.config({
  cloud_name: 'dlt3eax5v',
  api_key: 264682751612879,
  api_secret: '-ni3xvaY-EPVfE6N-WR_U4GcyaA'
})
CloudinaryArray.uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'appMaroil'
  })
  // .then((result) => console.log(result))
}
CloudinaryArray.deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id)
}
module.exports = CloudinaryArray

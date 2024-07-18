const postCtrl = {}

const fs = require('fs-extra')
// const { uploadImage } = require('../../libs/cloudinary')
const Posts = require('../models/PostsModels')
const admin = require('firebase-admin')
// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: 'gs://maroilconnect.appspot.com/'
// })
const bucket = admin.storage().bucket()
postCtrl.createPost = async (req, res) => {
  const { _id, nombre } = req.user
  const {
    authorPost = _id,
    titlePost,
    contentPost,
    commentsPost,
    likesPost,
    viewsPost,
    categoriaPost,
    // mediaPost,
    estatusPost
  } = req.body
  try {
    const mediaPost = []
    console.log(req.body)
    if (Array.isArray(req.files?.mediaPost)) {
      // console.log('lo que manda en las miganes', req.files.mediaPost)
      for (const file of req.files.mediaPost) {
        console.log('file', file)
        const uniqueFileName = `${Date.now()}_${file.name}`

        await bucket.upload(file.tempFilePath, {
          // Opciones de subida, como el nombre del archivo, metadatos, etc.
          destination: `mediaPost/${uniqueFileName}`,
          metadata: {
            contentType: file.mimetype
          }
        })
        const [url] = await bucket
          .file(`mediaPost/${uniqueFileName}`)
          .getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
          })
        console.log('url', url)
        // const result = await uploadImage(file.tempFilePath)
        await fs.remove(file.tempFilePath)
        mediaPost.push({
          url: url,
          public_id: url
        })
      }
    } else if (typeof req.files?.mediaPost === 'object') {
      console.log('lo que manda en las miganes', req.files.mediaPost)
      const file = req.files.mediaPost
      const uniqueFileName = `${Date.now()}_${file.name}`
      await bucket.upload(file.tempFilePath, {
        // Opciones de subida, como el nombre del archivo, metadatos, etc.
        destination: `mediaPost/${uniqueFileName}`,
        metadata: {
          contentType: file.mimetype
        }
      })
      // const result = await uploadImage(file.tempFilePath)

      const [url] = await bucket
        .file(`mediaPost/${uniqueFileName}`)
        .getSignedUrl({
          action: 'read',
          expires: '03-09-2491'
        })
      console.log('url', url)
      await fs.remove(file.tempFilePath)
      mediaPost.push({
        url: url,
        public_id: url
      })
    } else {
      console.log('mediaPost is not iterable')
    }
    const newPost = new Posts({
      authorPost,
      titlePost,
      contentPost,
      commentsPost,
      likesPost,
      viewsPost,
      mediaPost,
      categoriaPost,
      estatusPost
    })
    const savePost = await newPost.save()
    await savePost.populate('authorPost', {
      nombre: 1,
      correo: 1
    })
    var message = {
      notification: {
        title: `Nuevo Post Agregado de ${nombre}`,
        body: `${titlePost}`
      },
      topic: 'allUsers' // El nombre del tema al que deseas enviar el mensaje
    }

    // Enviar un mensaje al tema.
    admin
      .messaging()
      .send(message)
      .then((response) => {
        // La respuesta es un ID de mensaje.
        console.log('Successfully sent message:', response)
      })
      .catch((error) => {
        console.log('Error sending message:', error)
      })
    res.status(200).json({
      savePost,
      message: 'Nuevo Post Agregado.'
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err.message
    })
  }
}

postCtrl.getPosts = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query
  try {
    const posts = await Posts.find({})
      .populate('authorPost', {
        nombre: 1,
        correo: 1
      })
      .populate({
        path: 'likesPost',
        select: 'authorLike createdAt',
        populate: {
          path: 'authorLike',
          select: 'nombre' // selecciona solo el campo 'nombre' del usuario
        }
      })
      .populate({
        path: 'viewsPost',
        select: 'authorView createdAt',
        populate: {
          path: 'authorView',
          select: 'nombre' // selecciona solo el campo 'nombre' del usuario
        }
      })
      .populate({
        path: 'commentsPost',
        select: 'authorComment contentComment createdAt',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'authorComment',
          select: 'nombre' // selecciona solo el campo 'nombre' del usuario
        }
      })
      .sort({ createdAt: -1 })
      .skip(Number(desde))
      .limit(Number(limite))
    res.status(200).json(posts)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err.message
    })
  }
}
postCtrl.getPostsAprobados = async (req, res) => {
  const { limite = 10, desde = 0 } = req.query
  if (isNaN(limite) || isNaN(desde)) {
    return res.status(400).json({
      error: 'Invalid query parameters'
    })
  }
  console.log('limite', limite)
  console.log('desde', desde)
  try {
    const posts = await Posts.find({ estatusPost: 'Aprobado' })
      .populate('authorPost', {
        nombre: 1,
        correo: 1
      })
      .populate({
        path: 'likesPost',
        select: 'authorLike createdAt',
        populate: {
          path: 'authorLike',
          select: 'nombre' // selecciona solo el campo 'nombre' del usuario
        }
      })
      .populate({
        path: 'viewsPost',
        select: 'authorView createdAt',
        populate: {
          path: 'authorView',
          select: 'nombre' // selecciona solo el campo 'nombre' del usuario
        }
      })
      .populate({
        path: 'commentsPost',
        select: 'authorComment contentComment createdAt',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'authorComment',
          select: 'nombre' // selecciona solo el campo 'nombre' del usuario
        }
      })
      .sort({ updatedAt: -1 })
      .skip(desde)
      .limit(limite)
    res.status(200).json(posts)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err.message
    })
  }
}
postCtrl.getPostsBorrador = async (req, res) => {
  const { limite = 10, desde = 0 } = req.query
  try {
    const posts = await Posts.find({ estatusPost: 'Borrador' })
      .populate('authorPost', {
        nombre: 1,
        correo: 1
      })
      .populate({
        path: 'likesPost',
        select: 'authorLike createdAt',
        populate: {
          path: 'authorLike',
          select: 'nombre' // selecciona solo el campo 'nombre' del usuario
        }
      })
      .populate({
        path: 'viewsPost',
        select: 'authorView createdAt',
        populate: {
          path: 'authorView',
          select: 'nombre' // selecciona solo el campo 'nombre' del usuario
        }
      })
      .populate({
        path: 'commentsPost',
        select: 'authorComment contentComment createdAt',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'authorComment',
          select: 'nombre' // selecciona solo el campo 'nombre' del usuario
        }
      })
      .sort({ createdAt: -1 })
      .skip(Number(desde))
      .limit(Number(limite))
    res.status(200).json(posts)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err.message
    })
  }
}
postCtrl.getPostsUser = async (req, res) => {
  console.log('req.user', req.user)
  const { id } = req.params
  const { limite = 15, desde = 0 } = req.query
  const userId = id // Asume que el id del usuario está en req.user._id
  try {
    const posts = await Posts.find({ authorPost: userId })
      .populate('authorPost', {
        nombre: 1,
        correo: 1
      })
      .populate({
        path: 'likesPost',
        select: 'authorLike createdAt',
        populate: {
          path: 'authorLike',
          select: 'nombre' // selecciona solo el campo 'nombre' del usuario
        }
      })
      .populate({
        path: 'viewsPost',
        select: 'authorView createdAt',
        populate: {
          path: 'authorView',
          select: 'nombre' // selecciona solo el campo 'nombre' del usuario
        }
      })
      .populate({
        path: 'commentsPost',
        select: 'authorComment contentComment createdAt',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'authorComment',
          select: 'nombre' // selecciona solo el campo 'nombre' del usuario
        }
      })
      .sort({ createdAt: -1 })
      .skip(desde)
      .limit(limite)
    res.status(200).json(posts)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err.message
    })
  }
}
postCtrl.getPost = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const post = await Posts.findById(id).populate('authorPost', {
      nombre: 1,
      correo: 1
    })
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

postCtrl.updatePost = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    authorPost,
    titlePost,
    contentPost,
    commentsPost,
    likesPost,
    viewsPost,
    mediaPost,
    categoriaPost,
    estatusPost
  } = req.body

  try {
    const updatePost = await Posts.findByIdAndUpdate(
      id,
      {
        authorPost,
        titlePost,
        contentPost,
        commentsPost,
        likesPost,
        viewsPost,
        mediaPost,
        categoriaPost,
        estatusPost
      },
      { new: true }
    ).populate('authorPost', {
      nombre: 1,
      correo: 1
    })
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updatePost,
      message: 'Post Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

postCtrl.deletePost = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Posts.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Post Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

module.exports = postCtrl

const postCtrl = {}

const fs = require('fs-extra')
const { uploadImage } = require('../../libs/cloudinary')
const Posts = require('../models/PostsModels')

postCtrl.createPost = async (req, res) => {
  console.log('validarTokenUsuario', req.user._id)

  const {
    authorPost = req.user._id,
    titlePost,
    contentPost,
    commentsPost,
    likesPost,
    viewsPost,
    // mediaPost,
    estatusPost
  } = req.body
  try {
    const mediaPost = []
    console.log(req.body)
    if (req.files?.mediaPost) {
      console.log('lo que manda en las miganes', req.files.mediaPost)
      for (const file of req.files.mediaPost) {
        const result = await uploadImage(file.tempFilePath)
        await fs.remove(file.tempFilePath)
        mediaPost.push({
          url: result.secure_url,
          public_id: result.public_id
        })
      }
    }
    const newPost = new Posts({
      authorPost,
      titlePost,
      contentPost,
      commentsPost,
      likesPost,
      viewsPost,
      mediaPost,
      estatusPost
    })
    const savePost = await newPost.save()
    await savePost.populate('authorPost', {
      nombre: 1,
      correo: 1
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
  const { limite = 15, desde = 0 } = req.query
  try {
    const posts = await Posts.find({})
      .populate('authorPost', {
        nombre: 1,
        correo: 1
      })
      .populate({
        path: 'likesPost',
        select: 'authorLike ',
        populate: {
          path: 'authorLike',
          select: 'nombre' // selecciona solo el campo 'nombre' del usuario
        }
      })
      .populate({
        path: 'viewsPost',
        select: 'authorView ',
        populate: {
          path: 'authorView',
          select: 'nombre' // selecciona solo el campo 'nombre' del usuario
        }
      })
      .populate({
        path: 'commentsPost',
        select: 'authorComment contentComment',
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
        estatusPost
      },
      { new: true }
    ).populate('authorPost', {
      nombre: 1,
      correo: 1
    })
    // VERIFICAR QUE UPDATE NO SEA NULL
    console.log(updatePost)
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

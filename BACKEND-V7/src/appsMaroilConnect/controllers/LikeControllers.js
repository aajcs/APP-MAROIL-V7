const likeCtrl = {}

const Likes = require('../models/LikesModel')
const Posts = require('../models/PostsModels')

likeCtrl.createLike = async (req, res) => {
  const { authorLike, postLike, estatusLike } = req.body
  try {
    // Buscar si ya existe un "like" de este usuario para este post
    const existingLike = await Likes.findOne({
      authorLike,
      postLike
    })

    if (existingLike) {
      return res
        .status(400)
        .json({ message: 'You have already liked this post.' })
    }
    const newLike = new Likes({
      authorLike,
      postLike,
      estatusLike
    })
    const saveLike = await newLike.save()
    await saveLike.populate('authorLike', {
      nombre: 1,
      correo: 1
    })
    // Actualizar el post para incluir el nuevo like
    const post = await Posts.findById(postLike)
    post.likesPost.push(saveLike._id)
    await post.save()

    res.status(200).json({
      saveLike,
      message: 'Nuevo Like Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

likeCtrl.getLikes = async (req, res) => {
  try {
    const skip = Number(req.query.skip) || 0
    const posts = await Likes.find({})
      .populate('authorLike', {
        nombre: 1,
        correo: 1
      })
      .skip(skip)
      .limit(10)
    res.status(200).json(posts)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err.message
    })
  }
}

likeCtrl.getLike = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const post = await Likes.findById(id).populate('authorLike', {
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

likeCtrl.updateLike = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const { authorLike, postLike, estatusLike } = req.body

  try {
    const updateLike = await Likes.findByIdAndUpdate(
      id,
      {
        authorLike,
        postLike,
        estatusLike
      },
      { new: true }
    ).populate('authorLike', {
      nombre: 1,
      correo: 1
    })
    // VERIFICAR QUE UPDATE NO SEA NULL
    console.log(updateLike)
    res.status(200).json({
      updateLike,
      message: 'Like Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

likeCtrl.deleteLike = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Likes.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Like Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

module.exports = likeCtrl

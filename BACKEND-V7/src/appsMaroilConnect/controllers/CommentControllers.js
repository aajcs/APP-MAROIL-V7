const commentCtrl = {}

const Comments = require('../models/CommentsModels')
const Posts = require('../models/PostsModels')

commentCtrl.createComment = async (req, res) => {
  console.log('iduser', req.user._id)
  const {
    authorComment = req.user._id,
    postComment,
    estatusComment,
    contentComment
  } = req.body
  try {
    const newComment = new Comments({
      authorComment,
      postComment,
      contentComment,
      estatusComment
    })
    const saveComment = await newComment.save()
    await saveComment.populate('authorComment', {
      nombre: 1,
      correo: 1
    })
    // Actualizar el post para incluir el nuevo comment
    const post = await Posts.findById(postComment)
    post.commentsPost.push(saveComment._id)
    const postactualizado = await post.save()
    // console.log('aqui se actrualiza', postactualizado)
    if (postactualizado) {
      res.status(200).json({
        saveComment: postactualizado,
        message: 'Nuevo Comment Agregado.'
      })
    }
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

commentCtrl.getComments = async (req, res) => {
  try {
    const skip = Number(req.query.skip) || 0
    const posts = await Comments.find({})
      .populate('authorComment', {
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

commentCtrl.getComment = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const post = await Comments.findById(id).populate('authorComment', {
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

commentCtrl.updateComment = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const { authorComment, postComment, estatusComment } = req.body

  try {
    const updateComment = await Comments.findByIdAndUpdate(
      id,
      {
        authorComment,
        postComment,
        estatusComment
      },
      { new: true }
    ).populate('authorComment', {
      nombre: 1,
      correo: 1
    })
    // VERIFICAR QUE UPDATE NO SEA NULL
    console.log(updateComment)
    res.status(200).json({
      updateComment,
      message: 'Comment Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

commentCtrl.deleteComment = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Comments.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Comment Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

module.exports = commentCtrl

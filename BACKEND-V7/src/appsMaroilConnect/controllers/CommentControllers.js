const commentCtrl = {}

const Comments = require('../models/CommentsModels')
const Posts = require('../models/PostsModels')
const Usuario = require('../../models/UsuarioModel')
const admin = require('firebase-admin')

commentCtrl.createComment = async (req, res) => {
  const { _id, nombre } = req.user
  const {
    authorComment = _id,
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
    const postAuthor = await Usuario.findById(post.authorPost)
    // Send a notification to the post author
    if (postAuthor.tokenFcm.length !== 0) {
      await admin.messaging().sendEachForMulticast({
        tokens: [...postAuthor.tokenFcm],
        // data: {
        //   owner: JSON.stringify(owner),
        //   user: JSON.stringify(user),
        //   picture: JSON.stringify(picture)
        // },
        notification: {
          title: `Comentario de ${nombre}`,
          body: `Tu post ${post.titlePost} ha recibido un nuevo Comentario ${contentComment}`
        },
        apns: {
          payload: {
            aps: {
              // Required for background/quit data-only messages on iOS
              // Note: iOS frequently will receive the message but decline to deliver it to your app.
              //           This is an Apple design choice to favor user battery life over data-only delivery
              //           reliability. It is not under app control, though you may see the behavior in device logs.
              'content-available': true,
              // Required for background/quit data-only messages on Android
              priority: 'high'
            }
          }
        }
      })
    }
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

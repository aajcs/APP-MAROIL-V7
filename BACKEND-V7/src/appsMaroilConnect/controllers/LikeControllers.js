const likeCtrl = {}

const Likes = require('../models/LikesModel')
const Posts = require('../models/PostsModels')
const Usuario = require('../../models/UsuarioModel')
const admin = require('firebase-admin')

// likeCtrl.createLike = async (req, res) => {
//   const { authorLike = req.user._id, postLike, estatusLike } = req.body
//   try {
//     // Buscar si ya existe un "like" de este usuario para este post
//     const existingLike = await Likes.findOne({
//       authorLike,
//       postLike
//     })

//     if (existingLike) {
//       // Delete the existing like
//       await Likes.deleteOne({ _id: existingLike._id })

//       // Remove the like from the post
//       const post = await Posts.findById(postLike)
//       post.likesPost.pull(existingLike._id)
//       await post.save()
//       return res
//         .status(200)
//         .json({ saveLike: post, message: 'Nuevo Like Quitado.' })
//     }
//     const newLike = new Likes({
//       authorLike,
//       postLike,
//       estatusLike
//     })
//     const saveLike = await newLike.save()
//     await saveLike.populate('authorLike', {
//       nombre: 1,
//       correo: 1
//     })
//     // Actualizar el post para incluir el nuevo like
//     const post = await Posts.findById(postLike)
//     post.likesPost.push(saveLike._id)
//     const postactualizado = await post.save()
//     // console.log('aqui se actrualiza', postactualizado)
//     if (postactualizado) {
//       res.status(200).json({
//         saveLike: postactualizado,
//         message: 'Nuevo Like Agregado.'
//       })
//     }
//   } catch (err) {
//     res.status(400).json({
//       error: err.message
//     })
//   }
// }
likeCtrl.createLike = async (req, res) => {
  const { _id, nombre } = req.user
  const { authorLike = _id, postLike, estatusLike } = req.body
  try {
    // Buscar si ya existe un "like" de este usuario para este post
    const existingLike = await Likes.findOne({
      authorLike,
      postLike
    })

    if (existingLike) {
      // Delete the existing like
      await Likes.deleteOne({ _id: existingLike._id })
      console.log('quitar like')
      // Remove the like from the post
      const post = await Posts.findById(postLike)
      post.likesPost.pull(existingLike._id)
      await post.save()
      return res
        .status(200)
        .json({ saveLike: post, message: 'Nuevo Like Quitado.' })
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
    console.log('actualizar like')

    // Actualizar el post para incluir el nuevo like
    const post = await Posts.findById(postLike)
    post.likesPost.push(saveLike._id)
    const postactualizado = await post.save()

    // Get the post author's information
    const postAuthor = await Usuario.findById(post.authorPost)
    console.log('postauthor', postAuthor.tokenFcm)
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
          title: `Like de ${nombre}`,
          body: `Tu post ${post.titlePost} ha recibido un nuevo like`
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
        saveLike: postactualizado,
        message: 'Nuevo Like Agregado.'
      })
    }
  } catch (err) {
    console.log('error', err)
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
        correo: 1,
        createdAt: 1
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

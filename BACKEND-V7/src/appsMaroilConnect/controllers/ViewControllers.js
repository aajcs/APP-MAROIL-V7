const viewCtrl = {}

const Views = require('../models/ViewsModels')
const Posts = require('../models/PostsModels')

viewCtrl.createView = async (req, res) => {
  console.log('iduser', req.user._id)
  const { authorView = req.user._id, postView, estatusView } = req.body
  try {
    // Buscar si ya existe un "view" de este usuario para este post
    const existingView = await Views.findOne({
      authorView,
      postView
    })

    if (existingView) {
      return res.status(200).json({ message: ' View existente.' })
    }
    const newView = new Views({
      authorView,
      postView,
      estatusView
    })
    const saveView = await newView.save()
    await saveView.populate('authorView', {
      nombre: 1,
      correo: 1
    })
    // Actualizar el post para incluir el nuevo view
    const post = await Posts.findById(postView)
    post.viewsPost.push(saveView._id)
    const postactualizado = await post.save()
    // console.log('aqui se actrualiza', postactualizado)
    if (postactualizado) {
      res.status(200).json({
        saveView: postactualizado,
        message: 'Nuevo View Agregado.'
      })
    }
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

viewCtrl.getViews = async (req, res) => {
  try {
    const skip = Number(req.query.skip) || 0
    const posts = await Views.find({})
      .populate('authorView', {
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

viewCtrl.getView = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const post = await Views.findById(id).populate('authorView', {
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

viewCtrl.updateView = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const { authorView, postView, estatusView } = req.body

  try {
    const updateView = await Views.findByIdAndUpdate(
      id,
      {
        authorView,
        postView,
        estatusView
      },
      { new: true }
    ).populate('authorView', {
      nombre: 1,
      correo: 1
    })
    // VERIFICAR QUE UPDATE NO SEA NULL
    console.log(updateView)
    res.status(200).json({
      updateView,
      message: 'View Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

viewCtrl.deleteView = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Views.findByIdAndDelete(id)
    res.status(200).json({
      message: 'View Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

module.exports = viewCtrl

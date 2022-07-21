/* eslint-disable space-before-function-paren */

const usuarioCtrl = {}
const Usuario = require('../models/UsuarioModel')
const jwt = require('jsonwebtoken')

usuarioCtrl.createUsuario = async (req, res) => {
  // ejemplo para recorre todo el cuerpo de boby
  // asigar a una variable todo el texto del boby
  // const usuario = req.body
  // recorrer todas las ids del cuerpo  la funcionmap recorre todo el arreglo y devuelve el valor usuario donde usuario sea usuario. id
  // const ids = usuario.map(usuario => usuario.id)
  // cuan es el valor maximo de todas las ids
  // const maxID = Math.max(...ids)
  // typeof del valor es undefined para el tipo de variable
  // usuario = [...usuario,newUsuario] esto sirve para agregar el nuevo usuario a los usuarios nuevos o usuario = usuario.contac(newUsuario)

  const {
    nombre,
    correo,
    user,
    password,
    roles,
    apps,
    usuariocreado,
    usuariomodificado
  } = req.body

  const newUsuario = new Usuario({
    nombre,
    correo,
    user,
    password,
    roles,
    apps,
    usuariocreado,
    usuariomodificado
  })
  try {
    newUsuario.password = await newUsuario.encryptPassword(newUsuario.password)

    const saveUsuario = await newUsuario.save()

    res.status(200).json({
      saveUsuario,
      message: 'Nuevo Usuario Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

usuarioCtrl.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({})
    res.status(200).json(usuarios)
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

usuarioCtrl.getUsuario = async (req, res) => {
  // params es los parametros que vienes por la url de quien consulta a la api
  // req es lo que viene de quien hace la solicitus
  // res es lo que envia de respuesta al servidor ya sea un json un error una imagen etc
  // Number(req.params.id) devuel un numero buscar como poner la variable como un ObjectId
  // sacando la propiedad de objeto sin nesecidad de crear una nueva constante
  const { id } = req.params
  try {
    const usuario = await Usuario.findById(id)
    if (usuario) {
      res.status(200).json(usuario)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

async function getUser(param) {
  try {
    return Usuario.findOne(param)
  } catch (error) {
    return false
  }
}

usuarioCtrl.updateUsuario = async (req, res) => {
  const { id } = req.params
  const {
    nombre,
    correo,
    user,
    password,
    roles,
    apps,
    usuariocreado,
    usuariomodificado
  } = req.body
  const newUsuario = new Usuario({
    nombre,
    correo,
    user,
    password,
    roles,
    apps,
    usuariocreado,
    usuariomodificado
  })
  try {
    newUsuario.password = await newUsuario.encryptPassword(newUsuario.password)
    // con el new : true me manda el registro actualizado
    const updateUsuario = await Usuario.findByIdAndUpdate(
      id,
      {
        nombre,
        correo,
        user,
        password: newUsuario.password,
        roles,
        apps,
        usuariocreado,
        usuariomodificado
      },
      { new: true }
    )
    // const usuario = await Usuario.findById(req.params.id)

    res.status(200).json({
      updateUsuario,
      message: 'Usuario Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

usuarioCtrl.deleteUsuario = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Usuario.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Usuario Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

usuarioCtrl.login = async (req, res) => {
  const { user, password } = req.body
  const faidUser = await getUser({ user })
  if (faidUser) {
    const verifyPassword = await faidUser.verifyPassword(password)
    if (!verifyPassword) {
      return res.status(400).json({
        status: false,
        message: 'password incorrect.'
      })
    }

    const userForToken = {
      id: faidUser._id.toString(),
      username: user.username
    }
    try {
      // crea el token del usario manera simple la de medudev es mas extensa con el beard
      // ,{  expiresIn: '7d'
      // }
      const token = jwt.sign(userForToken, process.env.PRIVATE_KEY)

      console.log(token)

      return res.status(200).json({
        faidUser,
        token,
        message: 'Login correct.'
      })
    } catch (err) {
      res.status(400).json({
        error: err
      })
    }
  } else {
    return res.status(400).json({
      status: false,
      message: 'usuario incorrecto'
    })
  }
}

module.exports = usuarioCtrl

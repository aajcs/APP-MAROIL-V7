/* eslint-disable space-before-function-paren */

const usuarioCtrl = {}
const Usuario = require('../models/UsuarioModel')
const jwt = require('jsonwebtoken')
const fs = require('fs-extra')
const admin = require('firebase-admin')
// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: 'gs://maroilconnect.appspot.com/'
// })
const bucket = admin.storage().bucket()
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
    rolesMaroilConnect,
    tokenFcm,
    chatMaroilConnect,
    departamento,
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
    rolesMaroilConnect,
    tokenFcm,
    chatMaroilConnect,
    departamento,

    usuariocreado,
    usuariomodificado
  })
  try {
    newUsuario.password = await newUsuario.encryptPassword(newUsuario.password)

    const saveUsuario = await newUsuario.save()
    const userForToken = {
      id: saveUsuario._id.toString(),
      username: saveUsuario.username
    }
    const token = jwt.sign(userForToken, process.env.PRIVATE_KEY)
    res.status(200).json({
      saveUsuario,
      token,
      message: 'Nuevo Usuario Agregado.'
    })
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate username
      return res.status(401).json({
        message: 'Correo ya existe.'
      })
    }
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
async function updatePassword(password, newUsuario) {
  if (password) {
    newUsuario.password = await newUsuario.encryptPassword(password)
    return newUsuario.password
  }
  return null
}
usuarioCtrl.updateUsuario = async (req, res) => {
  console.log('req.files', req.files)
  const { id } = req.params
  const {
    nombre,
    correo,
    user,
    password,
    roles,
    apps,
    rolesMaroilConnect,
    chatMaroilConnect,
    // avatarUser,
    tokenFcm,
    departamento,
    usuariocreado,
    usuariomodificado
  } = req.body
  try {
    const avatarUser = []
    let avatarUnicoUser = ''
    if (req.files?.avatarUnicoUser) {
      const uniqueFileName = `${Date.now()}_${req.files.avatarUnicoUser.name}`
      await bucket.upload(req.files.avatarUnicoUser.tempFilePath, {
        destination: `avatarUnicoUser/${uniqueFileName}`,
        metadata: {
          contentType: req.files.avatarUnicoUser.mimetype
        }
      })
      const [url] = await bucket
        .file(`avatarUnicoUser/${uniqueFileName}`)
        .getSignedUrl({
          action: 'read',
          expires: '03-09-2491'
        })
      await fs.remove(req.files.avatarUnicoUser.tempFilePath)
      console.log('url', url)
      avatarUnicoUser = url
    }
    if (Array.isArray(req.files?.avatarUser)) {
      // console.log('lo que manda en las miganes', req.files.avatarUser)
      for (const file of req.files.avatarUser) {
        console.log('file', file)
        const uniqueFileName = `${Date.now()}_${file.name}`

        await bucket.upload(file.tempFilePath, {
          // Opciones de subida, como el nombre del archivo, metadatos, etc.
          destination: `avatarUser/${uniqueFileName}`,
          metadata: {
            contentType: file.mimetype
          }
        })
        const [url] = await bucket
          .file(`avatarUser/${uniqueFileName}`)
          .getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
          })
        console.log('url', url)
        // const result = await uploadImage(file.tempFilePath)
        await fs.remove(file.tempFilePath)
        avatarUser.push({
          url: url,
          public_id: url
        })
      }
    } else if (typeof req.files?.avatarUser === 'object') {
      console.log('lo que manda en las miganes', req.files.avatarUser)
      const file = req.files.avatarUser
      const uniqueFileName = `${Date.now()}_${file.name}`
      await bucket.upload(file.tempFilePath, {
        // Opciones de subida, como el nombre del archivo, metadatos, etc.
        destination: `avatarUser/${uniqueFileName}`,
        metadata: {
          contentType: file.mimetype
        }
      })
      // const result = await uploadImage(file.tempFilePath)

      const [url] = await bucket
        .file(`avatarUser/${uniqueFileName}`)
        .getSignedUrl({
          action: 'read',
          expires: '03-09-2491'
        })
      console.log('url', url)
      await fs.remove(file.tempFilePath)
      avatarUser.push({
        url: url,
        public_id: url
      })
    } else {
      console.log('avatarUser is not iterable')
    }
    const newUsuario = new Usuario({
      nombre,
      correo,
      user,
      password,
      roles,
      apps,
      rolesMaroilConnect,
      chatMaroilConnect,
      avatarUser,
      avatarUnicoUser,
      tokenFcm,
      usuariocreado,
      usuariomodificado
    })
    const updatedPassword = await updatePassword(password, newUsuario)
    // con el new : true me manda el registro actualizado
    const updateData = {
      nombre,
      correo,
      user,
      roles,
      apps,
      rolesMaroilConnect,
      tokenFcm,
      chatMaroilConnect,
      departamento,
      usuariocreado,
      usuariomodificado,
      avatarUser,
      avatarUnicoUser
    }

    if (updatedPassword) {
      updateData.password = updatedPassword
    }

    const updateUsuario = await Usuario.findByIdAndUpdate(id, updateData, {
      new: true
    })
    // const usuario = await Usuario.findById(req.params.id)

    res.status(200).json({
      updateUsuario,
      message: 'Usuario Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    console.log('error', err)
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

usuarioCtrl.validarTokenUsuario = (req, res = response) => {
  console.log('validarTokenUsuario', req.user._id)
  // Generar el JWT
  // const token = jwt.sign(req.user._id, process.env.PRIVATE_KEY)

  const userForToken = {
    id: req.user._id.toString(),
    username: req.user.username
  }
  try {
    // crea el token del usario manera simple la de medudev es mas extensa con el beard
    // ,{  expiresIn: '7d'
    // }
    const token = jwt.sign(userForToken, process.env.PRIVATE_KEY)

    console.log(token)

    return res.status(200).json({
      faidUser: req.user,
      token,
      message: 'Login correct.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }

  // console.log('token', token)
  // res.json({
  //   usuario: req.user
  //   // token: token
  // })
}

usuarioCtrl.updateTokenFcmUser = async (req, res) => {
  const { id } = req.params
  const { tokenFcm } = req.body
  console.log('tokenfcm22', tokenFcm)
  try {
    // Actualizar el usuario con el nuevo tokenFcm
    const updatedUsuario = await Usuario.findByIdAndUpdate(
      id,
      { $addToSet: { tokenFcm: tokenFcm } },
      { new: true }
    )

    return res.status(200).json({
      updatedUser: updatedUsuario,
      // token,
      message: 'Token FCM updated successfully.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}
usuarioCtrl.removeTokenFcmUser = async (req, res) => {
  const { id } = req.params
  const { tokenFcm } = req.body
  console.log('tokenfcm22', tokenFcm)
  try {
    // Eliminar el tokenFcm del usuario
    const updatedUsuario = await Usuario.findByIdAndUpdate(
      id,
      { $pull: { tokenFcm: tokenFcm } },
      { new: true }
    )

    return res.status(200).json({
      updatedUser: updatedUsuario,
      // token,
      message: 'Token FCM removed successfully.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

module.exports = usuarioCtrl

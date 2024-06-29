const User = require('../models/UsuarioModel')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    console.log('aqui llego', req.headers.authorization)

    if (token) {
      const verify = jwt.verify(token, process.env.PRIVATE_KEY)
      if (verify) {
        req.userID = verify.id
        const user = await User.findById(verify.id)
        if (user) {
          req.user = user
          next()
        } else {
          return res.status(400).json({
            status: false,
            message: 'No existe el usuario.'
          })
        }
      } else {
        return res.status(400).json({
          status: false,
          message: 'The token is incorrect.'
        })
      }
    } else {
      return res.status(400).json({
        status: false,
        message: 'The token is requi red.'
      })
    }
  } catch (error) {
    console.log(error.name)
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({
        status: false,
        message: 'The token is expired.'
      })
    }
    return res.status(400).json({
      status: false,
      message: 'The token is invalid.'
    })
  }
}

module.exports = authMiddleware

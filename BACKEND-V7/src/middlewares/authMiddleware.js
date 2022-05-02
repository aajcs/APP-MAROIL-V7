const User = require('../models/UsuarioModel')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (token) {
      const verify = jwt.verify(token, process.env.PRIVATE_KEY)
      if (verify) {
        req.userID = verify
        const user = await User.findById(verify)
        if (user) {
          req.user = user
          next()
        } else {
          return res.status(400).json({
            status: false
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
    return res.status(400).json({
      status: false,
      message: 'The token is invalid.'
    })
  }
}

module.exports = authMiddleware

const express = require('express')
const router = express.Router()

const {
  login,
  getUsuarios,
  createUsuario,
  getUsuario,
  deleteUsuario,
  updateUsuario
} = require('../controllers/UsuarioControlles')
const auth = require('../middlewares/authMiddleware')
const { isAdmin, isSuperAdmin } = require('../middlewares/RolesMiddleware')

router
  .route('/')
  .get(auth, isAdmin, getUsuarios)
  .post(auth, isAdmin, createUsuario)
router.route('/login').post(login)
router
  .route('/:id')
  .get(auth, isAdmin, getUsuario)
  .delete(auth, isSuperAdmin, deleteUsuario)
  .put(auth, isAdmin, updateUsuario)

module.exports = router

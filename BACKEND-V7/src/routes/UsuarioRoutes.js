const express = require('express')
const router = express.Router()

const {
  login,
  getUsuarios,
  createUsuario,
  getUsuario,
  deleteUsuario,
  updateUsuario,
  validarTokenUsuario
} = require('../controllers/UsuarioControlles')
const auth = require('../middlewares/authMiddleware')
const { isAdmin, isSuperAdmin } = require('../middlewares/RolesMiddleware')

router.route('/').get(auth, isAdmin, getUsuarios).post(createUsuario)
router.route('/login').post(login).get(auth, validarTokenUsuario)
router
  .route('/:id')
  .get(auth, isAdmin, getUsuario)
  .delete(auth, isSuperAdmin, deleteUsuario)
  .put(auth, isAdmin, updateUsuario)

module.exports = router

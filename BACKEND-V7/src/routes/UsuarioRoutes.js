const express = require('express')
const router = express.Router()

const {
  login,
  getUsuarios,
  createUsuario,
  getUsuario,
  deleteUsuario,
  updateUsuario,
  validarTokenUsuario,
  updateTokenFcmUser,
  removeTokenFcmUser
} = require('../controllers/UsuarioControlles')
const auth = require('../middlewares/authMiddleware')
const { isAdmin, isSuperAdmin } = require('../middlewares/RolesMiddleware')

router.route('/').get(auth, getUsuarios).post(createUsuario)
router.route('/login').post(login).get(auth, validarTokenUsuario)
router.route('/removeTokenFcm/:id').put(removeTokenFcmUser)
router.route('/newTokenFcm/:id').put(updateTokenFcmUser)
router
  .route('/:id')
  .get(getUsuario)
  .delete(auth, isSuperAdmin, deleteUsuario)
  .put(auth, isAdmin, updateUsuario)

module.exports = router

const express = require('express')
const router = express.Router()

const {
  getUnidadAuxs,
  createUnidadAux,
  getUnidadAux,
  deleteUnidadAux,
  updateUnidadAux
} = require('../controllers/UnidadAuxControlles')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getUnidadAuxs)
  .post([auth, isAppControl, isOperador], createUnidadAux)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getUnidadAux)
  .delete([auth, isAppControl, isSuperAdmin], deleteUnidadAux)
  .put([auth, isAppControl, isOperador], updateUnidadAux)

module.exports = router

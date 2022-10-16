const express = require('express')
const router = express.Router()

const {
  getViajeAuxs,
  createViajeAux,
  getViajeAux,
  deleteViajeAux,
  updateViajeAux
} = require('../controllers/ViajeAuxControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getViajeAuxs)
  .post([auth, isAppControl, isOperador], createViajeAux)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getViajeAux)
  .delete([auth, isAppControl, isSuperAdmin], deleteViajeAux)
  .put([auth, isAppControl, isOperador], updateViajeAux)

module.exports = router

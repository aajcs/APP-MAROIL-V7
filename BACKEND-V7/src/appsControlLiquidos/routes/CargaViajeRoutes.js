const express = require('express')
const router = express.Router()

const {
  getCargaViajes,
  createCargaViaje,
  getCargaViaje,
  deleteCargaViaje,
  updateCargaViaje
} = require('../controllers/CargaViajeControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getCargaViajes)
  .post([auth, isAppControl, isOperador], createCargaViaje)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getCargaViaje)
  .delete([auth, isAppControl, isSuperAdmin], deleteCargaViaje)
  .put([auth, isAppControl, isOperador], updateCargaViaje)

module.exports = router

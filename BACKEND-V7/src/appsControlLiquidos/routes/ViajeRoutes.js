const express = require('express')
const router = express.Router()

const {
  getViajes,
  createViaje,
  getViaje,
  deleteViaje,
  updateViaje
} = require('../controllers/ViajeControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getViajes)
  .post([auth, isAppControl, isOperador], createViaje)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getViaje)
  .delete([auth, isAppControl, isSuperAdmin], deleteViaje)
  .put([auth, isAppControl, isOperador], updateViaje)

module.exports = router

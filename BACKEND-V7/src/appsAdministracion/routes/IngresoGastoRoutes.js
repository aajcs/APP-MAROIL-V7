const express = require('express')
const router = express.Router()

const {
  getIngresoGastos,
  createIngresoGasto,
  getIngresoGasto,
  deleteIngresoGasto,
  updateIngresoGasto
} = require('../controllers/IngresoGastoControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getIngresoGastos)
  .post([auth, isAppControl, isOperador], createIngresoGasto)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getIngresoGasto)
  .delete([auth, isAppControl, isSuperAdmin], deleteIngresoGasto)
  .put([auth, isAppControl, isOperador], updateIngresoGasto)

module.exports = router

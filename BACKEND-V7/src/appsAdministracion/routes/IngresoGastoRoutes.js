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
const { isAppAdministracion } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppAdministracion, isLectura], getIngresoGastos)
  .post([auth, isAppAdministracion, isOperador], createIngresoGasto)

router
  .route('/:id')
  .get([auth, isAppAdministracion, isOperador], getIngresoGasto)
  .delete([auth, isAppAdministracion, isSuperAdmin], deleteIngresoGasto)
  .put([auth, isAppAdministracion, isOperador], updateIngresoGasto)

module.exports = router

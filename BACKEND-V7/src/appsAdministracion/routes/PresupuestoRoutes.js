const express = require('express')
const router = express.Router()

const {
  getPresupuestos,
  createPresupuesto,
  getPresupuesto,
  deletePresupuesto,
  updatePresupuesto
} = require('../controllers/PresupuestoControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppAdministracion } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppAdministracion, isLectura], getPresupuestos)
  .post([auth, isAppAdministracion, isOperador], createPresupuesto)

router
  .route('/:id')
  .get([auth, isAppAdministracion, isOperador], getPresupuesto)
  .delete([auth, isAppAdministracion, isSuperAdmin], deletePresupuesto)
  .put([auth, isAppAdministracion, isOperador], updatePresupuesto)

module.exports = router

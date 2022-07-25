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
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getPresupuestos)
  .post([auth, isAppControl, isOperador], createPresupuesto)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getPresupuesto)
  .delete([auth, isAppControl, isSuperAdmin], deletePresupuesto)
  .put([auth, isAppControl, isOperador], updatePresupuesto)

module.exports = router

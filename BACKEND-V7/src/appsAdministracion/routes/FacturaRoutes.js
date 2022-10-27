const express = require('express')
const router = express.Router()

const {
  getFacturas,
  createFactura,
  getFactura,
  deleteFactura,
  updateFactura
} = require('../controllers/FacturaControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppAdministracion } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppAdministracion, isLectura], getFacturas)
  .post([auth, isAppAdministracion, isOperador], createFactura)

router
  .route('/:id')
  .get([auth, isAppAdministracion, isOperador], getFactura)
  .delete([auth, isAppAdministracion, isSuperAdmin], deleteFactura)
  .put([auth, isAppAdministracion, isOperador], updateFactura)

module.exports = router

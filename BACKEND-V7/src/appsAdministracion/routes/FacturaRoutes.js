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
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getFacturas)
  .post([auth, isAppControl, isOperador], createFactura)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getFactura)
  .delete([auth, isAppControl, isSuperAdmin], deleteFactura)
  .put([auth, isAppControl, isOperador], updateFactura)

module.exports = router

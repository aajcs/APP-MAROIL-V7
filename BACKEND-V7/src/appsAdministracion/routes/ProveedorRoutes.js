const express = require('express')
const router = express.Router()

const {
  getProveedors,
  createProveedor,
  getProveedor,
  deleteProveedor,
  updateProveedor
} = require('../controllers/ProveedorControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getProveedors)
  .post([auth, isAppControl, isOperador], createProveedor)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getProveedor)
  .delete([auth, isAppControl, isSuperAdmin], deleteProveedor)
  .put([auth, isAppControl, isOperador], updateProveedor)

module.exports = router

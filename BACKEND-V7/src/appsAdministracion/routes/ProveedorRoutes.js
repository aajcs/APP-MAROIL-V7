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
const { isAppAdministracion } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppAdministracion, isLectura], getProveedors)
  .post([auth, isAppAdministracion, isOperador], createProveedor)

router
  .route('/:id')
  .get([auth, isAppAdministracion, isOperador], getProveedor)
  .delete([auth, isAppAdministracion, isSuperAdmin], deleteProveedor)
  .put([auth, isAppAdministracion, isOperador], updateProveedor)

module.exports = router

const express = require('express')
const router = express.Router()

const {
  getProformas,
  createProforma,
  getProforma,
  deleteProforma,
  updateProforma
} = require('../controllers/ProformaControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppAdministracion } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppAdministracion, isLectura], getProformas)
  .post([auth, isAppAdministracion, isOperador], createProforma)

router
  .route('/:id')
  .get([auth, isAppAdministracion, isOperador], getProforma)
  .delete([auth, isAppAdministracion, isSuperAdmin], deleteProforma)
  .put([auth, isAppAdministracion, isOperador], updateProforma)

module.exports = router

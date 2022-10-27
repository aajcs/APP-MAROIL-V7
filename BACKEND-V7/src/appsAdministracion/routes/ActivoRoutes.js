const express = require('express')
const router = express.Router()

const {
  getActivos,
  createActivo,
  getActivo,
  deleteActivo,
  updateActivo
} = require('../controllers/ActivoControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppAdministracion } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppAdministracion, isLectura], getActivos)
  .post([auth, isAppAdministracion, isOperador], createActivo)

router
  .route('/:id')
  .get([auth, isAppAdministracion, isOperador], getActivo)
  .delete([auth, isAppAdministracion, isSuperAdmin], deleteActivo)
  .put([auth, isAppAdministracion, isOperador], updateActivo)

module.exports = router

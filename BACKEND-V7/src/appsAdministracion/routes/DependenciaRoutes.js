const express = require('express')
const router = express.Router()

const {
  getDependencias,
  createDependencia,
  getDependencia,
  deleteDependencia,
  updateDependencia
} = require('../controllers/DependenciaControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppAdministracion } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppAdministracion, isLectura], getDependencias)
  .post([auth, isAppAdministracion, isOperador], createDependencia)

router
  .route('/:id')
  .get([auth, isAppAdministracion, isOperador], getDependencia)
  .delete([auth, isAppAdministracion, isSuperAdmin], deleteDependencia)
  .put([auth, isAppAdministracion, isOperador], updateDependencia)

module.exports = router

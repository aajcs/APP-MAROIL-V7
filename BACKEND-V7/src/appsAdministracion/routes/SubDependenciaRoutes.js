const express = require('express')
const router = express.Router()

const {
  getSubDependencias,
  createSubDependencia,
  getSubDependencia,
  deleteSubDependencia,
  updateSubDependencia
} = require('../controllers/SubDependenciaControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppAdministracion } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppAdministracion, isLectura], getSubDependencias)
  .post([auth, isAppAdministracion, isOperador], createSubDependencia)

router
  .route('/:id')
  .get([auth, isAppAdministracion, isOperador], getSubDependencia)
  .delete([auth, isAppAdministracion, isSuperAdmin], deleteSubDependencia)
  .put([auth, isAppAdministracion, isOperador], updateSubDependencia)

module.exports = router

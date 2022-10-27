const express = require('express')
const router = express.Router()

const {
  getProcesoAuxs,
  createProcesoAux,
  getProcesoAux,
  deleteProcesoAux,
  updateProcesoAux
} = require('../controllers/ProcesoAuxControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppAdministracion } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppAdministracion, isLectura], getProcesoAuxs)
  .post([auth, isAppAdministracion, isOperador], createProcesoAux)

router
  .route('/:id')
  .get([auth, isAppAdministracion, isOperador], getProcesoAux)
  .delete([auth, isAppAdministracion, isSuperAdmin], deleteProcesoAux)
  .put([auth, isAppAdministracion, isOperador], updateProcesoAux)

module.exports = router

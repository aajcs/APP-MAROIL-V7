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
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getProcesoAuxs)
  .post([auth, isAppControl, isOperador], createProcesoAux)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getProcesoAux)
  .delete([auth, isAppControl, isSuperAdmin], deleteProcesoAux)
  .put([auth, isAppControl, isOperador], updateProcesoAux)

module.exports = router

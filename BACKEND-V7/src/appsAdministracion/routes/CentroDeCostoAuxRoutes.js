const express = require('express')
const router = express.Router()

const {
  getCentroDeCostoAuxs,
  createCentroDeCostoAux,
  getCentroDeCostoAux,
  deleteCentroDeCostoAux,
  updateCentroDeCostoAux
} = require('../controllers/CentroDeCostoAuxControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppAdministracion } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppAdministracion, isLectura], getCentroDeCostoAuxs)
  .post([auth, isAppAdministracion, isOperador], createCentroDeCostoAux)

router
  .route('/:id')
  .get([auth, isAppAdministracion, isOperador], getCentroDeCostoAux)
  .delete([auth, isAppAdministracion, isSuperAdmin], deleteCentroDeCostoAux)
  .put([auth, isAppAdministracion, isOperador], updateCentroDeCostoAux)

module.exports = router

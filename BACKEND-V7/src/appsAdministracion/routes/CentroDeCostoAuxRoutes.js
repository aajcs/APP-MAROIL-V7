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
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getCentroDeCostoAuxs)
  .post([auth, isAppControl, isOperador], createCentroDeCostoAux)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getCentroDeCostoAux)
  .delete([auth, isAppControl, isSuperAdmin], deleteCentroDeCostoAux)
  .put([auth, isAppControl, isOperador], updateCentroDeCostoAux)

module.exports = router

const express = require('express')
const router = express.Router()

const {
  getCentroDeCostoAuxs,
  createCentroDeCostoAux,
  getCentroDeCostoAux,
  deleteCentroDeCostoAux,
  updateCentroDeCostoAux
} = require('../controllers/CentroDeCostoAuxControlles')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isAdmin,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getCentroDeCostoAuxs)
  .post([auth, isAppControl, isAdmin], createCentroDeCostoAux)

router
  .route('/:id')
  .get([auth, isAppControl, isAdmin], getCentroDeCostoAux)
  .delete([auth, isAppControl, isSuperAdmin], deleteCentroDeCostoAux)
  .put([auth, isAppControl, isAdmin], updateCentroDeCostoAux)

module.exports = router

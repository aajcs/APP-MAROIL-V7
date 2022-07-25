const express = require('express')
const router = express.Router()

const {
  getPrioridadAuxs,
  createPrioridadAux,
  getPrioridadAux,
  deletePrioridadAux,
  updatePrioridadAux
} = require('../controllers/PrioridadAuxControlles')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getPrioridadAuxs)
  .post([auth, isAppControl, isOperador], createPrioridadAux)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getPrioridadAux)
  .delete([auth, isAppControl, isSuperAdmin], deletePrioridadAux)
  .put([auth, isAppControl, isOperador], updatePrioridadAux)

module.exports = router

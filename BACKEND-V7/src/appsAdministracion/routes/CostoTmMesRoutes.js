const express = require('express')
const router = express.Router()

const {
  getCostoTmMess,
  createCostoTmMes,
  getCostoTmMes,
  deleteCostoTmMes,
  updateCostoTmMes
} = require('../controllers/CostoTmMesControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getCostoTmMess)
  .post([auth, isAppControl, isOperador], createCostoTmMes)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getCostoTmMes)
  .delete([auth, isAppControl, isSuperAdmin], deleteCostoTmMes)
  .put([auth, isAppControl, isOperador], updateCostoTmMes)

module.exports = router

const express = require('express')
const router = express.Router()

const {
  getCajaChicas,
  createCajaChica,
  getCajaChica,
  deleteCajaChica,
  updateCajaChica
} = require('../controllers/CajaChicaControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppAdministracion } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppAdministracion, isLectura], getCajaChicas)
  .post([auth, isAppAdministracion, isOperador], createCajaChica)

router
  .route('/:id')
  .get([auth, isAppAdministracion, isOperador], getCajaChica)
  .delete([auth, isAppAdministracion, isSuperAdmin], deleteCajaChica)
  .put([auth, isAppAdministracion, isOperador], updateCajaChica)

module.exports = router

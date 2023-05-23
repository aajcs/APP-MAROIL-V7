const express = require('express')
const router = express.Router()

const {
  getDominios,
  createDominio,
  getDominio,
  deleteDominio,
  updateDominio
} = require('../controllers/DominioControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppAdministracion } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppAdministracion, isLectura], getDominios)
  .post([auth, isAppAdministracion, isOperador], createDominio)

router
  .route('/:id')
  .get([auth, isAppAdministracion, isOperador], getDominio)
  .delete([auth, isAppAdministracion, isSuperAdmin], deleteDominio)
  .put([auth, isAppAdministracion, isOperador], updateDominio)

module.exports = router

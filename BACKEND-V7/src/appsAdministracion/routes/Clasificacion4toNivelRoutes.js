const express = require('express')
const router = express.Router()

const {
  getClasificacion4toNivels,
  createClasificacion4toNivel,
  getClasificacion4toNivel,
  deleteClasificacion4toNivel,
  updateClasificacion4toNivel
} = require('../controllers/Clasificacion4toNivelControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppAdministracion } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppAdministracion, isLectura], getClasificacion4toNivels)
  .post([auth, isAppAdministracion, isOperador], createClasificacion4toNivel)

router
  .route('/:id')
  .get([auth, isAppAdministracion, isOperador], getClasificacion4toNivel)
  .delete(
    [auth, isAppAdministracion, isSuperAdmin],
    deleteClasificacion4toNivel
  )
  .put([auth, isAppAdministracion, isOperador], updateClasificacion4toNivel)

module.exports = router

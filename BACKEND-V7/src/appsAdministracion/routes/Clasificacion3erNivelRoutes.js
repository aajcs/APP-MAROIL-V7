const express = require('express')
const router = express.Router()

const {
  getClasificacion3erNivels,
  createClasificacion3erNivel,
  getClasificacion3erNivel,
  deleteClasificacion3erNivel,
  updateClasificacion3erNivel
} = require('../controllers/Clasificacion3erNivelControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppAdministracion } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppAdministracion, isLectura], getClasificacion3erNivels)
  .post([auth, isAppAdministracion, isOperador], createClasificacion3erNivel)

router
  .route('/:id')
  .get([auth, isAppAdministracion, isOperador], getClasificacion3erNivel)
  .delete(
    [auth, isAppAdministracion, isSuperAdmin],
    deleteClasificacion3erNivel
  )
  .put([auth, isAppAdministracion, isOperador], updateClasificacion3erNivel)

module.exports = router

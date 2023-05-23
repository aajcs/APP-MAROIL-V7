const express = require('express')
const router = express.Router()

const {
  getClasificacionServicios,
  createClasificacionServicio,
  getClasificacionServicio,
  deleteClasificacionServicio,
  updateClasificacionServicio
} = require('../controllers/ClasificacionServicioControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppAdministracion } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppAdministracion, isLectura], getClasificacionServicios)
  .post([auth, isAppAdministracion, isOperador], createClasificacionServicio)

router
  .route('/:id')
  .get([auth, isAppAdministracion, isOperador], getClasificacionServicio)
  .delete(
    [auth, isAppAdministracion, isSuperAdmin],
    deleteClasificacionServicio
  )
  .put([auth, isAppAdministracion, isOperador], updateClasificacionServicio)

module.exports = router

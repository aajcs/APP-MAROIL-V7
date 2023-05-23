const express = require('express')
const router = express.Router()

const {
  getActividadAsociadas,
  createActividadAsociada,
  getActividadAsociada,
  deleteActividadAsociada,
  updateActividadAsociada
} = require('../controllers/ActividadAsociadaControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppAdministracion } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppAdministracion, isLectura], getActividadAsociadas)
  .post([auth, isAppAdministracion, isOperador], createActividadAsociada)

router
  .route('/:id')
  .get([auth, isAppAdministracion, isOperador], getActividadAsociada)
  .delete([auth, isAppAdministracion, isSuperAdmin], deleteActividadAsociada)
  .put([auth, isAppAdministracion, isOperador], updateActividadAsociada)

module.exports = router

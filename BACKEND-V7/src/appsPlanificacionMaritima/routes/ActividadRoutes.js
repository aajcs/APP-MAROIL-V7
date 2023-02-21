const express = require('express')
const router = express.Router()

const {
  getActividads,
  createActividad,
  getActividad,
  deleteActividad,
  updateActividad
} = require('../controllers/ActividadControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getActividads)
  .post([auth, isAppControl, isOperador], createActividad)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getActividad)
  .delete([auth, isAppControl, isSuperAdmin], deleteActividad)
  .put([auth, isAppControl, isOperador], updateActividad)

module.exports = router

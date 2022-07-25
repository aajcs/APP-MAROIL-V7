const express = require('express')
const router = express.Router()

const {
  getActivos,
  createActivo,
  getActivo,
  deleteActivo,
  updateActivo
} = require('../controllers/ActivoControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getActivos)
  .post([auth, isAppControl, isOperador], createActivo)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getActivo)
  .delete([auth, isAppControl, isSuperAdmin], deleteActivo)
  .put([auth, isAppControl, isOperador], updateActivo)

module.exports = router

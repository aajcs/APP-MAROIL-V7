const express = require('express')
const router = express.Router()

const {
  getBarcos,
  createBarco,
  getBarco,
  deleteBarco,
  updateBarco
} = require('../controllers/BarcoControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isLectura,
  isOperador,

  isSuperAdmin
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getBarcos)
  .post([auth, isAppControl, isOperador], createBarco)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getBarco)
  .delete([auth, isAppControl, isSuperAdmin], deleteBarco)
  .put([auth, isAppControl, isOperador], updateBarco)

module.exports = router

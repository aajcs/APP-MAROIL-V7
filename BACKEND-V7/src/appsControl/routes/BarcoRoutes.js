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
  isAdmin,
  isSuperAdmin
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getBarcos)
  .post([auth, isAppControl, isAdmin], createBarco)

router
  .route('/:id')
  .get([auth, isAppControl, isAdmin], getBarco)
  .delete([auth, isAppControl, isSuperAdmin], deleteBarco)
  .put([auth, isAppControl, isAdmin], updateBarco)

module.exports = router

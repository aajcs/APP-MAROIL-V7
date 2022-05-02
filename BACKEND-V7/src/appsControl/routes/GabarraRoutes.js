const express = require('express')
const router = express.Router()

const {
  getGabarras,
  createGabarra,
  getGabarra,
  deleteGabarra,
  updateGabarra
} = require('../controllers/GabarraControlles')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isAdmin,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getGabarras)
  .post([auth, isAppControl, isAdmin], createGabarra)

router
  .route('/:id')
  .get([auth, isAppControl, isAdmin], getGabarra)
  .delete([auth, isAppControl, isSuperAdmin], deleteGabarra)
  .put([auth, isAppControl, isAdmin], updateGabarra)

module.exports = router

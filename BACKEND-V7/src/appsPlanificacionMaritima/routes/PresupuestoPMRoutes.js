const express = require('express')
const router = express.Router()

const {
  getPresupuestoPMs,
  createPresupuestoPM,
  getPresupuestoPM,
  deletePresupuestoPM,
  updatePresupuestoPM
} = require('../controllers/PresupuestoPMControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getPresupuestoPMs)
  .post([auth, isAppControl, isOperador], createPresupuestoPM)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getPresupuestoPM)
  .delete([auth, isAppControl, isSuperAdmin], deletePresupuestoPM)
  .put([auth, isAppControl, isOperador], updatePresupuestoPM)

module.exports = router

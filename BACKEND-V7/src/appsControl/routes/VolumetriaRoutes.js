const express = require('express')
const router = express.Router()

const {
  getVolumetrias,
  createVolumetria,
  getVolumetria,
  deleteVolumetria,
  updateVolumetria
} = require('../controllers/VolumetriaControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getVolumetrias)
  .post([auth, isAppControl, isOperador], createVolumetria)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getVolumetria)
  .delete([auth, isAppControl, isSuperAdmin], deleteVolumetria)
  .put([auth, isAppControl, isOperador], updateVolumetria)

module.exports = router

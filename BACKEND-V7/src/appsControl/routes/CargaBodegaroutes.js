const express = require('express')
const router = express.Router()

const {
  getCargaBodegas,
  createCargaBodega,
  getCargaBodega,
  deleteCargaBodega,
  updateCargaBodega
} = require('../controllers/CargaBodegaControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isAdmin,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getCargaBodegas)
  .post([auth, isAppControl, isAdmin], createCargaBodega)

router
  .route('/:id')
  .get([auth, isAppControl, isAdmin], getCargaBodega)
  .delete([auth, isAppControl, isSuperAdmin], deleteCargaBodega)
  .put([auth, isAppControl, isAdmin], updateCargaBodega)

module.exports = router

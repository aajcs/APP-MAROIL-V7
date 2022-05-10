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
  isLectura,
  isOperador,

  isSuperAdmin
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getCargaBodegas)
  .post([auth, isAppControl, isOperador], createCargaBodega)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getCargaBodega)
  .delete([auth, isAppControl, isSuperAdmin], deleteCargaBodega)
  .put([auth, isAppControl, isOperador], updateCargaBodega)

module.exports = router

const express = require('express')
const router = express.Router()

const {
  getGastosOperacionales,
  createGastosOperacionale,
  getGastosOperacionale,
  deleteGastosOperacionale,
  updateGastosOperacionale
} = require('../controllers/GastosOperacionaleControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getGastosOperacionales)
  .post([auth, isAppControl, isOperador], createGastosOperacionale)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getGastosOperacionale)
  .delete([auth, isAppControl, isSuperAdmin], deleteGastosOperacionale)
  .put([auth, isAppControl, isOperador], updateGastosOperacionale)

module.exports = router

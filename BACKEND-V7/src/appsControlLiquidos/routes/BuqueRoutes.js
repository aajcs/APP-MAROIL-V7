const express = require('express')
const router = express.Router()

const {
  getBuques,
  createBuque,
  getBuque,
  deleteBuque,
  updateBuque
} = require('../controllers/BuqueControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isLectura,
  isOperador,

  isSuperAdmin
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getBuques)
  .post([auth, isAppControl, isOperador], createBuque)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getBuque)
  .delete([auth, isAppControl, isSuperAdmin], deleteBuque)
  .put([auth, isAppControl, isOperador], updateBuque)

module.exports = router

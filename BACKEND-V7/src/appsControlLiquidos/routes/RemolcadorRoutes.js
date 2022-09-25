const express = require('express')
const router = express.Router()

const {
  getRemolcadors,
  createRemolcador,
  getRemolcador,
  deleteRemolcador,
  updateRemolcador
} = require('../controllers/RemolcadorControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getRemolcadors)
  .post([auth, isAppControl, isOperador], createRemolcador)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getRemolcador)
  .delete([auth, isAppControl, isSuperAdmin], deleteRemolcador)
  .put([auth, isAppControl, isOperador], updateRemolcador)

module.exports = router

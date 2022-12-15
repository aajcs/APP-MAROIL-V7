const express = require('express')
const router = express.Router()

const {
  getGanadors,
  createGanador,
  getGanador,
  deleteGanador,
  updateGanador
} = require('../controllers/GanadorControlles')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getGanadors)
  .post([auth, isAppControl, isOperador], createGanador)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getGanador)
  .delete([auth, isAppControl, isSuperAdmin], deleteGanador)
  .put([auth, isAppControl, isOperador], updateGanador)

module.exports = router

const express = require('express')
const router = express.Router()

const {
  getEmbarcacions,
  createEmbarcacion,
  getEmbarcacion,
  deleteEmbarcacion,
  updateEmbarcacion
} = require('../controllers/EmbarcacionControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getEmbarcacions)
  .post([auth, isAppControl, isOperador], createEmbarcacion)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getEmbarcacion)
  .delete([auth, isAppControl, isSuperAdmin], deleteEmbarcacion)
  .put([auth, isAppControl, isOperador], updateEmbarcacion)

module.exports = router

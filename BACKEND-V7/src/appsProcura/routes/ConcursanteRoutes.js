const express = require('express')
const router = express.Router()

const {
  getConcursantes,
  createConcursante,
  getConcursante,
  deleteConcursante,
  updateConcursante
} = require('../controllers/ConcursanteControlles')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getConcursantes)
  .post([auth, isAppControl, isOperador], createConcursante)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getConcursante)
  .delete([auth, isAppControl, isSuperAdmin], deleteConcursante)
  .put([auth, isAppControl, isOperador], updateConcursante)

module.exports = router

const express = require('express')
const router = express.Router()

const {
  getMensualidadOpMess,
  createMensualidadOpMes,
  getMensualidadOpMes,
  deleteMensualidadOpMes,
  updateMensualidadOpMes
} = require('../controllers/MensualidadOpMesControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getMensualidadOpMess)
  .post([auth, isAppControl, isOperador], createMensualidadOpMes)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getMensualidadOpMes)
  .delete([auth, isAppControl, isSuperAdmin], deleteMensualidadOpMes)
  .put([auth, isAppControl, isOperador], updateMensualidadOpMes)

module.exports = router

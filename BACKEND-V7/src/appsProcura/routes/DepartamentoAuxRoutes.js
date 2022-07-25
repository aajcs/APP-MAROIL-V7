const express = require('express')
const router = express.Router()

const {
  getDepartamentoAuxs,
  createDepartamentoAux,
  getDepartamentoAux,
  deleteDepartamentoAux,
  updateDepartamentoAux
} = require('../controllers/DepartamentoAuxControlles')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getDepartamentoAuxs)
  .post([auth, isAppControl, isOperador], createDepartamentoAux)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getDepartamentoAux)
  .delete([auth, isAppControl, isSuperAdmin], deleteDepartamentoAux)
  .put([auth, isAppControl, isOperador], updateDepartamentoAux)

module.exports = router

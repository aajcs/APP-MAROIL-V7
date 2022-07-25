const express = require('express')
const router = express.Router()

const {
  getProyectoAuxs,
  createProyectoAux,
  getProyectoAux,
  deleteProyectoAux,
  updateProyectoAux
} = require('../controllers/ProyectoAuxControlles')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getProyectoAuxs)
  .post([auth, isAppControl, isOperador], createProyectoAux)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getProyectoAux)
  .delete([auth, isAppControl, isSuperAdmin], deleteProyectoAux)
  .put([auth, isAppControl, isOperador], updateProyectoAux)

module.exports = router

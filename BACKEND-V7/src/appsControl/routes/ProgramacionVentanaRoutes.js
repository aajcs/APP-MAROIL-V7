const express = require('express')
const router = express.Router()

const {
  getProgramacionVentanas,
  createProgramacionVentana,
  getProgramacionVentana,
  deleteProgramacionVentana,
  updateProgramacionVentana
} = require('../controllers/ProgramacionVentanaControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isLectura,
  isAdmin,
  isSuperAdmin
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getProgramacionVentanas)
  .post([auth, isAppControl, isAdmin], createProgramacionVentana)

router
  .route('/:id')
  .get([auth, isAppControl, isAdmin], getProgramacionVentana)
  .delete([auth, isAppControl, isSuperAdmin], deleteProgramacionVentana)
  .put([auth, isAppControl, isAdmin], updateProgramacionVentana)

module.exports = router

const express = require('express')
const router = express.Router()

const {
  getTanqueAuxs,
  createTanqueAux,
  getTanqueAux,
  deleteTanqueAux,
  updateTanqueAux
} = require('../controllers/TanqueAuxControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getTanqueAuxs)
  .post([auth, isAppControl, isOperador], createTanqueAux)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getTanqueAux)
  .delete([auth, isAppControl, isSuperAdmin], deleteTanqueAux)
  .put([auth, isAppControl, isOperador], updateTanqueAux)

module.exports = router

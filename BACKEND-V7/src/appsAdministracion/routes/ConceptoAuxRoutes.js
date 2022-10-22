const express = require('express')
const router = express.Router()

const {
  getConceptoAuxs,
  createConceptoAux,
  getConceptoAux,
  deleteConceptoAux,
  updateConceptoAux
} = require('../controllers/ConceptoAuxControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getConceptoAuxs)
  .post([auth, isAppControl, isOperador], createConceptoAux)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getConceptoAux)
  .delete([auth, isAppControl, isSuperAdmin], deleteConceptoAux)
  .put([auth, isAppControl, isOperador], updateConceptoAux)

module.exports = router

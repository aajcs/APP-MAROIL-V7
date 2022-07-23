const express = require('express')
const router = express.Router()

const {
  getRequisicionMaterialess,
  createRequisicionMateriales,
  getRequisicionMateriales,
  deleteRequisicionMateriales,
  updateRequisicionMateriales
} = require('../controllers/RequisicionMaterialesControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isLectura,
  isOperador,

  isSuperAdmin
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getRequisicionMaterialess)
  .post([auth, isAppControl, isOperador], createRequisicionMateriales)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getRequisicionMateriales)
  .delete([auth, isAppControl, isSuperAdmin], deleteRequisicionMateriales)
  .put([auth, isAppControl, isOperador], updateRequisicionMateriales)

module.exports = router

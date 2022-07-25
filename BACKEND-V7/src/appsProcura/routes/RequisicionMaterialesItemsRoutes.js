const express = require('express')
const router = express.Router()

const {
  getRequisicionMaterialesItemss,
  createRequisicionMaterialesItems,
  getRequisicionMaterialesItems,
  deleteRequisicionMaterialesItems,
  updateRequisicionMaterialesItems
} = require('../controllers/RequisicionMaterialesItemsControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  // isAdmin,
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getRequisicionMaterialesItemss)
  .post([auth, isAppControl, isOperador], createRequisicionMaterialesItems)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getRequisicionMaterialesItems)
  .delete([auth, isAppControl, isSuperAdmin], deleteRequisicionMaterialesItems)
  .put([auth, isAppControl, isOperador], updateRequisicionMaterialesItems)

module.exports = router

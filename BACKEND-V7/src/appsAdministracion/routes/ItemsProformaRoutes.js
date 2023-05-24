const express = require('express')
const router = express.Router()

const {
  getItemsProformas,
  createItemsProforma,
  getItemsProforma,
  deleteItemsProforma,
  updateItemsProforma
} = require('../controllers/ItemsProformaControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppAdministracion } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppAdministracion, isLectura], getItemsProformas)
  .post([auth, isAppAdministracion, isOperador], createItemsProforma)

router
  .route('/:id')
  .get([auth, isAppAdministracion, isOperador], getItemsProforma)
  .delete([auth, isAppAdministracion, isSuperAdmin], deleteItemsProforma)
  .put([auth, isAppAdministracion, isOperador], updateItemsProforma)

module.exports = router

const express = require('express')
const router = express.Router()

const {
  getDivisions,
  createDivision,
  getDivision,
  deleteDivision,
  updateDivision
} = require('../controllers/DivisionControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppAdministracion } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppAdministracion, isLectura], getDivisions)
  .post([auth, isAppAdministracion, isOperador], createDivision)

router
  .route('/:id')
  .get([auth, isAppAdministracion, isOperador], getDivision)
  .delete([auth, isAppAdministracion, isSuperAdmin], deleteDivision)
  .put([auth, isAppAdministracion, isOperador], updateDivision)

module.exports = router

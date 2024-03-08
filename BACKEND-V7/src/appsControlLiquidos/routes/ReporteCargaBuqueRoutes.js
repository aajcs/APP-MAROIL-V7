const express = require('express')
const router = express.Router()

const {
  getReporteCargaBuques,
  createReporteCargaBuque,
  getReporteCargaBuque,
  deleteReporteCargaBuque,
  updateReporteCargaBuque
} = require('../controllers/ReporteCargaBuqueControllers')

const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isLectura,
  isOperador,
  isSuperAdmin
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getReporteCargaBuques)
  .post([auth, isAppControl, isOperador], createReporteCargaBuque)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getReporteCargaBuque)
  .delete([auth, isAppControl, isSuperAdmin], deleteReporteCargaBuque)
  .put([auth, isAppControl, isOperador], updateReporteCargaBuque)

module.exports = router

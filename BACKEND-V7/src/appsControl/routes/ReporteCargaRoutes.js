const express = require('express')
const router = express.Router()

const {
  getReporteCargas,
  createReporteCarga,
  getReporteCarga,
  deleteReporteCarga,
  updateReporteCarga
} = require('../controllers/ReporteCargaControlles')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isAdmin,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getReporteCargas)
  .post([auth, isAppControl, isAdmin], createReporteCarga)

router
  .route('/:id')
  .get([auth, isAppControl, isAdmin], getReporteCarga)
  .delete([auth, isAppControl, isSuperAdmin], deleteReporteCarga)
  .put([auth, isAppControl, isAdmin], updateReporteCarga)

module.exports = router

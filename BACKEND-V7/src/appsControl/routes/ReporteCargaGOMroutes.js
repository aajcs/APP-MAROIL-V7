const express = require('express')
const router = express.Router()

const {
  getReporteCargaGOMs,
  createReporteCargaGOM,
  getReporteCargaGOM,
  deleteReporteCargaGOM,
  updateReporteCargaGOM
} = require('../controllers/ReporteCargaGOMControllers')

const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isLectura,
  isOperador,
  isSuperAdmin
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getReporteCargaGOMs)
  .post([auth, isAppControl, isOperador], createReporteCargaGOM)

router
  .route('/:id')
  .get([auth, isAppControl, isOperador], getReporteCargaGOM)
  .delete([auth, isAppControl, isSuperAdmin], deleteReporteCargaGOM)
  .put([auth, isAppControl, isOperador], updateReporteCargaGOM)

module.exports = router

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
  isAdmin,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router
  .route('/')
  .get([auth, isAppControl, isLectura], getReporteCargaGOMs)
  .post([auth, isAppControl, isAdmin], createReporteCargaGOM)

router
  .route('/:id')
  .get([auth, isAppControl, isAdmin], getReporteCargaGOM)
  .delete([auth, isAppControl, isSuperAdmin], deleteReporteCargaGOM)
  .put([auth, isAppControl, isAdmin], updateReporteCargaGOM)

module.exports = router

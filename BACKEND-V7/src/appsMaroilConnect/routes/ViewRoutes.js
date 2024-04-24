const express = require('express')
const router = express.Router()

const {
  createView,
  getViews,
  getView,
  updateView,
  deleteView
} = require('../controllers/ViewControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router.route('/').get(getViews).post([auth], createView)

router.route('/:id').get(getView).delete(deleteView).put(updateView)

module.exports = router

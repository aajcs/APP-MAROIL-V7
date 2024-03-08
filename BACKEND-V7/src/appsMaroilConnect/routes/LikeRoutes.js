const express = require('express')
const router = express.Router()

const {
  createLike,
  getLikes,
  getLike,
  updateLike,
  deleteLike
} = require('../controllers/LikeControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router.route('/').get(getLikes).post(createLike)

router.route('/:id').get(getLike).delete(deleteLike).put(updateLike)

module.exports = router

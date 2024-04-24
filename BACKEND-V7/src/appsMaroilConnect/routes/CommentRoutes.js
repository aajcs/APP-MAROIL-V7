const express = require('express')
const router = express.Router()

const {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment
} = require('../controllers/CommentControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router.route('/').get(getComments).post([auth], createComment)

router.route('/:id').get(getComment).delete(deleteComment).put(updateComment)

module.exports = router

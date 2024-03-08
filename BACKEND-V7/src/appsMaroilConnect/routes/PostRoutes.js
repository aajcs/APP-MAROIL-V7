const express = require('express')
const router = express.Router()

const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
} = require('../controllers/PostControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router.route('/').get(getPosts).post([auth], createPost)

router.route('/:id').get(getPost).delete(deletePost).put(updatePost)

module.exports = router

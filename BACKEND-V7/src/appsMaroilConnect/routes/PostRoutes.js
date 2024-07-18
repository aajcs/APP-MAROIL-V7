const express = require('express')
const router = express.Router()

const {
  createPost,
  getPosts,
  getPostsAprobados,
  getPostsBorrador,
  getPostsUser,
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

router.route('/').get([auth], getPosts).post([auth], createPost)
router.route('/aprobados/').get([auth], getPostsAprobados)
router.route('/borrador/').get([auth], getPostsBorrador)
router.route('/user/:id').get([auth], getPostsUser)

router.route('/:id').get(getPost).delete(deletePost).put(updatePost)

module.exports = router

const express = require('express')
const router = express.Router()

const {
  createChat,
  getChats,
  getChat,
  updateChat,
  deleteChat
} = require('../controllers/ChatControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router.route('/').get([auth], getChats).post([auth], createChat)

router.route('/:id').get(getChat).delete([auth], deleteChat).put(updateChat)

module.exports = router

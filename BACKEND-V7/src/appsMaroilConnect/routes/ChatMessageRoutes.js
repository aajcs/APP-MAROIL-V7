const express = require('express')
const router = express.Router()

const {
  sendChatMessage,
  getChatMessages,
  getTotalChatMessages,
  getLastChatMessages,
  getChatMessage,
  updateChatMessage,
  deleteChatMessage
} = require('../controllers/ChatMessageControllers')
const auth = require('../../middlewares/authMiddleware')
const { isAppControl } = require('../../middlewares/AppsMiddleware')
const {
  isOperador,
  isSuperAdmin,
  isLectura
} = require('../../middlewares/RolesMiddleware')

router.route('/').get([auth], getChatMessages).post([auth], sendChatMessage)

// router
//   .route('/:id')
//   .get([auth], getChatMessages)
//   .delete([auth], deleteChatMessage)
//   .put(updateChatMessage)
router.route('/:chatIdChatMessage').get([auth], getChatMessages)
router.route('/total/:chatIdChatMessage').get([auth], getTotalChatMessages)
router.route('/last/:chatIdChatMessage').get([auth], getLastChatMessages)

module.exports = router

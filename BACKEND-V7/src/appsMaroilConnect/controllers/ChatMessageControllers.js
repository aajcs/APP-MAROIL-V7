const chatMessageCtrl = {}

const { getIo } = require('../../utils')
const ChatMessage = require('../models/ChatMessageModel')

// chatMessageCtrl.createChatMessage = async (req, res) => {
//   console.log('iduser', req.user._id)
//   const { participanteOne, participanteTwo } = req.body
//   try {
//     const foundChatMessage = await ChatMessage.findOne({
//       participanteOne,
//       participanteTwo
//     })
//     const foundChatMessageInv = await ChatMessage.findOne({
//       participanteTwo,
//       participanteOne
//     })
//     if (foundChatMessage || foundChatMessageInv) {
//       return res.status(200).json({
//         message: 'Ya existe un chat entre estos dos usuarios.'
//       })
//     }
//     const newChatMessage = new ChatMessage({
//       participanteOne,
//       participanteTwo
//     })
//     const chatMessageSave = await newChatMessage.save()
//     res.status(200).json({
//       chatMessageSave,
//       message: 'Nuevo ChatMessage Agregado.'
//     })
//     // await saveChatMessage.populate('authorChatMessage', {
//     //   nombre: 1,
//     //   correo: 1
//     // })
//     // Actualizar el post para incluir el nuevo chatMessage
//   } catch (err) {
//     res.status(400).json({
//       error: err.message
//     })
//   }
// }
chatMessageCtrl.sendChatMessage = async (req, res) => {
  const { _id } = req.user
  console.log('iduser', _id)
  const { chatIdChatMessage, messageChatMessage } = req.body
  console.log('chatIdChatMessage', chatIdChatMessage)
  console.log('messageChatMessage', messageChatMessage)

  try {
    if (chatIdChatMessage === undefined || messageChatMessage === undefined) {
      return res.status(400).json({
        message: 'chatIdChatMessage y messageChatMessage son requeridos.'
      })
    }
    const newChatMessage = new ChatMessage({
      chatIdChatMessage,
      userChatMessage: _id,
      messageChatMessage,
      typeChatMessage: 'text'
    })
    const chatMessageSave = await newChatMessage.save()

    getIo().sockets.in(chatIdChatMessage).emit('newMessage', chatMessageSave)
    getIo()
      .sockets.in(`chat-${chatIdChatMessage}`)
      .emit('newMessageNotify', chatMessageSave)

    res.status(200).json({
      chatMessageSave,
      message: 'Nuevo ChatMessage Agregado.'
    })
    // await saveChatMessage.populate('authorChatMessage', {
    //   nombre: 1,
    //   correo: 1
    // })
    // Actualizar el post para incluir el nuevo chatMessage
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}
chatMessageCtrl.getChatMessages = async (req, res) => {
  const { chatIdChatMessage } = req.params
  try {
    const chatsMessages = await ChatMessage.find({
      chatIdChatMessage
    })
      .sort({ createdAt: 1 })
      .populate('userChatMessage')
    const totalChatsMessages = await ChatMessage.find({
      chatIdChatMessage
    }).count()
    res.status(200).json({ chatsMessages, totalChatsMessages })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err.message
    })
  }
}
chatMessageCtrl.getTotalChatMessages = async (req, res) => {
  const { chatIdChatMessage } = req.params
  try {
    const totalChatsMessages = await ChatMessage.find({
      chatIdChatMessage
    }).count()

    res.status(200).json(totalChatsMessages)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err.message
    })
  }
}
chatMessageCtrl.getLastChatMessages = async (req, res) => {
  const { chatIdChatMessage } = req.params
  try {
    const lastChatsMessages = await ChatMessage.findOne({
      chatIdChatMessage
    }).sort({ createdAt: -1 })

    res.status(200).json(lastChatsMessages || {})
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err.message
    })
  }
}

chatMessageCtrl.getChatMessage = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const post = await ChatMessage.findById(id)
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

chatMessageCtrl.updateChatMessage = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const { authorChatMessage, postChatMessage, estatusChatMessage } = req.body

  try {
    const updateChatMessage = await ChatMessage.findByIdAndUpdate(
      id,
      {
        authorChatMessage,
        postChatMessage,
        estatusChatMessage
      },
      { new: true }
    ).populate('authorChatMessage', {
      nombre: 1,
      correo: 1
    })
    // VERIFICAR QUE UPDATE NO SEA NULL
    console.log(updateChatMessage)
    res.status(200).json({
      updateChatMessage,
      message: 'ChatMessage Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

chatMessageCtrl.deleteChatMessage = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await ChatMessage.findByIdAndDelete(id)
    res.status(200).json({
      message: 'ChatMessage Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

module.exports = chatMessageCtrl

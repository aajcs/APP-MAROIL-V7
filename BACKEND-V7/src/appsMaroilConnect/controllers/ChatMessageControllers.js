const chatMessageCtrl = {}
const admin = require('firebase-admin')

const { getIo } = require('../../utils')
const ChatMessage = require('../models/ChatMessageModel')
const Chat = require('../models/ChatModel')

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
  const { _id, nombre } = req.user

  const { chatIdChatMessage, messageChatMessage } = req.body

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
    const chat = await Chat.findById(chatIdChatMessage).populate(
      'participanteOne participanteTwo',
      { nombre: 1, tokenFcm: 1 }
    )
    const participant =
      chat.participanteOne.id.toString() === _id.toString()
        ? chat.participanteTwo
        : chat.participanteOne
    getIo().sockets.in(chatIdChatMessage).emit('newMessage', chatMessageSave)
    getIo()
      .sockets.in(`chat-${chatIdChatMessage}`)
      .emit('newMessageNotify', chatMessageSave)
    if (participant.tokenFcm !== 0) {
      await admin.messaging().sendEachForMulticast({
        tokens: [...participant.tokenFcm],
        // data: {
        //   owner: JSON.stringify(owner),
        //   user: JSON.stringify(user),
        //   picture: JSON.stringify(picture)
        // },
        notification: {
          title: `Nuevo Mensaje de ${nombre}`,
          body: `${messageChatMessage}`
        },
        apns: {
          payload: {
            aps: {
              // Required for background/quit data-only messages on iOS
              // Note: iOS frequently will receive the message but decline to deliver it to your app.
              //           This is an Apple design choice to favor user battery life over data-only delivery
              //           reliability. It is not under app control, though you may see the behavior in device logs.
              'content-available': true,
              // Required for background/quit data-only messages on Android
              priority: 'high'
            }
          }
        }
      })
    }
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

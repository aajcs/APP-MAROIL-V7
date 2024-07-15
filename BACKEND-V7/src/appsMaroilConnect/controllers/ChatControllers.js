const likeCtrl = {}

const ChatMessage = require('../models/ChatMessageModel')
const Chat = require('../models/ChatModel')

likeCtrl.createChat = async (req, res) => {
  const { participanteOne, participanteTwo } = req.body
  try {
    const foundChat = await Chat.findOne({
      participanteOne,
      participanteTwo
    })
    const foundChatInv = await Chat.findOne({
      participanteTwo,
      participanteOne
    })
    if (foundChat || foundChatInv) {
      return res.status(200).json({
        message: 'Ya existe un chat entre estos dos usuarios.'
      })
    }
    const newChat = new Chat({
      participanteOne,
      participanteTwo
    })
    const chatSave = await newChat.save()
    res.status(201).json({
      chatSave,
      message: 'Nuevo Chat Agregado.'
    })
    // await saveChat.populate('authorChat', {
    //   nombre: 1,
    //   correo: 1
    // })
    // Actualizar el post para incluir el nuevo like
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

likeCtrl.getChats = async (req, res) => {
  const { _id } = req.user
  try {
    const chats = await Chat.find({
      $or: [{ participanteOne: _id }, { participanteTwo: _id }]
    })
      .populate('participanteOne', {
        nombre: 1,
        correo: 1
      })
      .populate('participanteTwo', {
        nombre: 1,
        correo: 1
      })

    const arrayChats = []
    for await (const chat of chats) {
      const lastMessage = await ChatMessage.findOne({
        chatIdChatMessage: chat._id
      }).sort({ createdAt: -1 })
      arrayChats.push({
        ...chat._doc,
        lastMessageDate: lastMessage?.createdAt || null
      })
    }
    res.status(200).json(arrayChats)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err.message
    })
  }
}

likeCtrl.getChat = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const post = await Chat.findById(id)
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

likeCtrl.updateChat = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const { authorChat, postChat, estatusChat } = req.body

  try {
    const updateChat = await Chat.findByIdAndUpdate(
      id,
      {
        authorChat,
        postChat,
        estatusChat
      },
      { new: true }
    ).populate('authorChat', {
      nombre: 1,
      correo: 1
    })
    // VERIFICAR QUE UPDATE NO SEA NULL
    console.log(updateChat)
    res.status(200).json({
      updateChat,
      message: 'Chat Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

likeCtrl.deleteChat = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Chat.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Chat Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

module.exports = likeCtrl

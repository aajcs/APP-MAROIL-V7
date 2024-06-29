const { Schema, model } = require('mongoose')

const chatMessageSchema = new Schema(
  {
    chatIdChatMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Chat'
    },
    userChatMessage: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    messageChatMessage: {
      type: String,
      trim: true
    },
    statusChatMessage: {
      type: Boolean,
      default: true
    },
    typeChatMessage: {
      type: String,
      enum: ['text', 'image', 'video', 'audio', 'document']
      // default: 'text'
    }
  },

  {
    timestamps: true,
    versionKey: false
  }
)
chatMessageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const ChatMessage = model('ChatMessage', chatMessageSchema)

module.exports = ChatMessage

const { Schema, model } = require('mongoose')

const chatSchema = new Schema(
  {
    participanteOne: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    participanteTwo: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },

  {
    timestamps: true,
    versionKey: false
  }
)
chatSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Chat = model('Chat', chatSchema)

module.exports = Chat

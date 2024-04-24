const { Schema, model } = require('mongoose')

const commentsSchema = new Schema(
  {
    authorComment: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    postComment: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },

    contentComment: {
      type: String,
      trim: true
    },

    estatusComment: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
commentsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Comments = model('Comments', commentsSchema)

module.exports = Comments

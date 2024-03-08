const { Schema, model } = require('mongoose')

const likesSchema = new Schema(
  {
    authorLike: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    postLike: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },

    estatusLike: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
likesSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Likes = model('Likes', likesSchema)

module.exports = Likes

const { Schema, model } = require('mongoose')

const postsSchema = new Schema(
  {
    authorPost: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    titlePost: {
      type: String,
      trim: true
    },
    contentPost: {
      type: String,
      trim: true
    },
    categoriaPost: {
      type: String,
      trim: true
    },
    fechaAprobadoPost: {
      type: Date
    },
    commentsPost: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comments'
      }
    ],
    likesPost: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Likes'
      }
    ],
    viewsPost: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Views'
      }
    ],
    mediaPost: [{ public_id: String, url: String }],

    estatusPost: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
postsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Posts = model('Posts', postsSchema)

module.exports = Posts

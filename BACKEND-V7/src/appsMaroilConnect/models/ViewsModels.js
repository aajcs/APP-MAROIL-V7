const { Schema, model } = require('mongoose')

const viewsSchema = new Schema(
  {
    authorView: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    postView: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },

    estatusView: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
viewsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Views = model('Views', viewsSchema)

module.exports = Views

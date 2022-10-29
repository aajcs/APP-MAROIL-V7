const moment = require('moment') // require

const { Schema, model } = require('mongoose')

const volumetriaSchema = new Schema(
  {
    barcoID: {
      type: Schema.Types.ObjectId,
      ref: 'Barco'
    },
    terminalAuxId: {
      type: String
    },
    blFinalVolumetria: {
      type: Number,
      default: 0
    },
    estatusVolumetria: {
      type: String
    },
    fechaBlFinalVolumetria: {
      type: Date
    },
    volumetriaCreado: {
      type: Date,
      default: moment()
    },
    volumetriaModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
volumetriaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Volumetria = model('Volumetria', volumetriaSchema)

module.exports = Volumetria

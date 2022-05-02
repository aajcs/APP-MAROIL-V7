const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const cargaBodegaSchema = new Schema(
  {
    barcoID: {
      type: Schema.Types.ObjectId,
      ref: 'Barco'
    },
    nombreBodega: {
      type: String,
      required: true
    },
    toneladasCargadasBodega: {
      type: Number,
      default: 0,
      required: true
    },
    toneladasCapacidadBodega: {
      type: Number,
      default: 0,
      required: true
    },
    estatusBodega: {
      type: String
    },
    cargaBodegaCreado: {
      type: Date,
      default: moment()
    },
    cargaBodegaModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
cargaBodegaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const CargaBodega = model('CargaBodega', cargaBodegaSchema)

module.exports = CargaBodega

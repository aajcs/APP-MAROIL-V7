const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const gastosOperacionaleSchema = new Schema(
  {
    nombreGastosOperacionale: {
      type: String
    },
    descripcionGastosOperacionale: {
      type: String
    },
    montoGastosOperacionale: {
      type: Number,
      default: 0
    },
    fechaGastosOperacionale: {
      type: Date,
      default: moment()
    },
    estatusGastosOperacionale: {
      type: String
    },
    embarcacion: {
      type: Schema.Types.ObjectId,
      ref: 'Embarcacion'
    },
    remolcador: {
      type: Schema.Types.ObjectId,
      ref: 'Remolcador'
    },
    viaje: {
      type: Schema.Types.ObjectId,
      ref: 'Viaje'
    },
    gastosOperacionaleCreado: {
      type: Date,
      default: moment()
    },
    gastosOperacionaleModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
gastosOperacionaleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const GastosOperacionales = model(
  'GastosOperacionales',
  gastosOperacionaleSchema
)

module.exports = GastosOperacionales

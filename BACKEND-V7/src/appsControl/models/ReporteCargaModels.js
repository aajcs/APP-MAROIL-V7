const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const reporteCargaSchema = new Schema(
  {
    barcoID: {
      type: Schema.Types.ObjectId,
      ref: 'Barco'
    },
    gabarraID: {
      type: Schema.Types.ObjectId,
      ref: 'Gabarra'
    },
    trenCargados: {
      type: Number,
      default: 0,
      required: true
    },
    trenTotales: {
      type: Number,
      default: 0,
      required: true
    },
    toneladasCargadas: {
      type: Number,
      default: 0,
      required: true
    },
    toneladasRemanente: {
      type: Number,
      default: 0,
      required: true
    },
    toneladasTotales: {
      type: Number,
      default: 0,
      required: true
    },
    reporteCargaCreado: {
      type: Date,
      default: moment()
    },
    reporteCargaModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
reporteCargaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const ReporteCarga = model('ReporteCarga', reporteCargaSchema)

module.exports = ReporteCarga

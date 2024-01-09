const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const reporteCargaGOMSchema = new Schema(
  {
    barcoID: {
      type: Schema.Types.ObjectId,
      ref: 'Barco'
    },
    ubicacionBuque: {
      type: String,
      required: true
    },
    puestoTerminal: {
      type: String
    },
    toneladasCargadasGOM: {
      type: Number,
      default: 0,
      required: true
    },
    tasaDeCargaGOM: {
      type: Number,
      default: 0,
      required: true
    },
    etc: {
      type: String
    },
    comentariosGOM: {
      type: String
    },
    observacionesGOM: {
      type: String
    },
    climaGOM: {
      type: String
    },
    vientoGOM: {
      type: String
    },
    mareaGOM: {
      type: String
    },
    reporteCargaGOMCreado: {
      type: Date,
      default: moment()
    },
    reporteCargaGOMModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
reporteCargaGOMSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const ReporteCargaGOM = model('ReporteCargaGOM', reporteCargaGOMSchema)

module.exports = ReporteCargaGOM

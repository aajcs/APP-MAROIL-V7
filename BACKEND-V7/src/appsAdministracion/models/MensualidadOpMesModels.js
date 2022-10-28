const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const mensualidadOpMesSchema = new Schema(
  {
    codigoMensualidadOpMes: {
      type: String
    },
    nombreMensualidadOpMes: {
      type: String
    },
    costoMensualidadOpMes: {
      type: Number
    },
    fechaEfectivaMensualidadOpMes: {
      type: Date,
      default: moment()
    },
    estatusMensualidadOpMes: {
      type: String
    },
    creadoMensualidadOpMes: {
      type: Date,
      default: moment()
    },
    modificadoMensualidadOpMes: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
mensualidadOpMesSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const MensualidadOpMes = model('MensualidadOpMes', mensualidadOpMesSchema)

module.exports = MensualidadOpMes

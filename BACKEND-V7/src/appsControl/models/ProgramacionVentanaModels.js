const moment = require('moment') // require

const { Schema, model } = require('mongoose')

const programacionVentanaSchema = new Schema(
  {
    nombreBuque: {
      type: String,
      required: true
    },
    descripcion: {
      type: String
    },
    terminalBuque: {
      type: String
    },
    buqueCliente: {
      type: String
    },
    buqueClienteVenta: {
      type: String
    },
    buquePaisDestino: {
      type: String
    },
    toneladasNominadas: {
      type: Number,
      default: 0
    },
    fechaInicioVentana: {
      type: Date
    },
    fechaFinVentana: {
      type: Date
    },
    programacionVentanaCreado: {
      type: Date,
      default: moment()
    },
    programacionVentanaModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

programacionVentanaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const ProgramacionVentana = model(
  'ProgramacionVentana',
  programacionVentanaSchema
)

module.exports = ProgramacionVentana

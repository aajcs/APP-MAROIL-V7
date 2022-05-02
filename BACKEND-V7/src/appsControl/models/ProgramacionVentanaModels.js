const moment = require('moment') // require

const { Schema, model } = require('mongoose')

const programacionVentanaSchema = new Schema(
  {
    nombreBuque: {
      type: String,
      required: true,
      unique: true
    },
    descripcion: {
      type: String
    },
    buqueCliente: {
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
    buqueCreado: {
      type: Date,
      default: moment()
    },
    buqueModificado: {
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

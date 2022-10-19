const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const procesoAuxSchema = new Schema(
  {
    codigoProceso: {
      type: String
    },
    nombreProceso: {
      type: String
    },
    descripcionProceso: {
      type: String
    },
    estatusProceso: {
      type: String
    },
    procesoCreado: {
      type: Date,
      default: moment()
    },
    procesoModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
procesoAuxSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const ProcesoAux = model('ProcesoAux', procesoAuxSchema)

module.exports = ProcesoAux

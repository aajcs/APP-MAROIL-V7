const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const prioridadAuxSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    nombrePrioridad: {
      type: String
    },
    descripcionPrioridad: {
      type: String
    },
    estatusPrioridad: {
      type: String
    },
    prioridadAuxCreado: {
      type: Date,
      default: moment()
    },
    prioridadAuxModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
prioridadAuxSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const PrioridadAux = model('PrioridadAux', prioridadAuxSchema)

module.exports = PrioridadAux

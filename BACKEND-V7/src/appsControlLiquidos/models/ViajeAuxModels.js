const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const ViajeAuxSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    descripcionViajeAux: {
      type: String
    },
    paisViajeAux: {
      type: String
    },
    estatusViajeAux: {
      type: String
    },
    fechaArriboViajeAux: {
      type: Date,
      default: moment()
    },
    fechaZarpeViajeAux: {
      type: Date,
      default: moment()
    },
    viaje: {
      type: Schema.Types.ObjectId,
      ref: 'Viaje'
    },
    viajeAuxCreado: {
      type: Date,
      default: moment()
    },
    viajeAuxModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
ViajeAuxSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const ViajeAux = model('ViajeAux', ViajeAuxSchema)

module.exports = ViajeAux

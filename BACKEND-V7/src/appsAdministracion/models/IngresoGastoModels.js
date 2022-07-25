const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const ingresoGastoSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    fechaIngresoGasto: {
      type: Date,
      default: moment()
    },
    conceptoIngresoGasto: {
      type: String
    },
    ingresoIngresoGasto: {
      type: Number
    },
    egresoIngresoGasto: {
      type: Number
    },
    estatusIngresoGasto: {
      type: String
    },
    procesoAuxId: {
      type: Schema.Types.ObjectId,
      ref: 'ProcesoAux'
    },
    proveedorId: {
      type: Schema.Types.ObjectId,
      ref: 'Proveedor'
    },
    centroDeCostoAuxId: {
      type: Schema.Types.ObjectId,
      ref: 'CentroDeCostoAux'
    },
    userCreatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    ingresoGastoCreado: {
      type: Date,
      default: moment()
    },
    ingresoGastoModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
ingresoGastoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const IngresoGasto = model('IngresoGasto', ingresoGastoSchema)

module.exports = IngresoGasto

const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const inventarioSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    codigoInventario: {
      type: String
    },
    nombreInventario: {
      type: String
    },
    descripcionInventario: {
      type: String
    },
    unidadAuxId: {
      type: Schema.Types.ObjectId,
      ref: 'UnidadAux'
    },
    existenciaInventario: {
      type: Number
    },
    maximoInventario: {
      type: Number
    },
    minimoInventario: {
      type: Number
    },
    costoInventario: {
      type: Number
    },
    puntoDeReordenInventario: {
      type: String
    },
    estatusInventario: {
      type: String
    },
    movimientoInventarioId: {
      type: Schema.Types.ObjectId,
      ref: 'MovimientoInventario'
    },
    userCreatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    inventarioCreado: {
      type: Date,
      default: moment()
    },
    inventarioModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
inventarioSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Inventario = model('Inventario', inventarioSchema)

module.exports = Inventario

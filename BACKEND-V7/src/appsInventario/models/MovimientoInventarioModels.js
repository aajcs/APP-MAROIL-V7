const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const movimientoInventarioSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    tipoMovimientoInventario: {
      type: String
    },
    fechaMovimientoInventario: {
      type: Date,
      default: moment()
    },
    centroDeCostoAuxId: {
      type: Schema.Types.ObjectId,
      ref: 'CentroDeCostoAux'
    },
    activoId: {
      type: Schema.Types.ObjectId,
      ref: 'Activo'
    },
    codigoMovimientoInventario: {
      type: String
    },
    descripcionMovimientoInventario: {
      type: String
    },
    estatusMovimientoInventario: {
      type: String
    },
    departamentoAuxId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'DepartamentoAux'
      }
    ],
    inventarioId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Inventario'
      }
    ],
    userCreatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    movimientoMovimientoInventarioCreado: {
      type: Date,
      default: moment()
    },
    movimientoMovimientoInventarioModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
movimientoInventarioSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const MovimientoInventario = model(
  'MovimientoInventario',
  movimientoInventarioSchema
)

module.exports = MovimientoInventario

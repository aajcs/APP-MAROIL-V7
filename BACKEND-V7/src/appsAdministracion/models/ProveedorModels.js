const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const proveedorSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    codigoProveedor: {
      type: String
    },
    nombreProveedor: {
      type: String
    },
    rifProveedor: {
      type: String
    },
    direccionProveedor: {
      type: String
    },
    contactoProveedor: {
      type: String
    },
    montoDeudaProveedor: {
      type: Number
    },
    montoPagadoProveedor: {
      type: Number
    },
    saldoTotalProveedor: {
      type: Number
    },
    estatusProveedor: {
      type: String
    },
    inventarioId: {
      type: Schema.Types.ObjectId,
      ref: 'Inventario'
    },
    userCreatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    proveedorCreado: {
      type: Date,
      default: moment()
    },
    proveedorModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
proveedorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Proveedor = model('Proveedor', proveedorSchema)

module.exports = Proveedor

const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const facturaSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    fechaFactura: {
      type: Date,
      default: moment()
    },
    fechaUltimoPagoFactura: {
      type: Date,
      default: moment()
    },
    codigoFactura: {
      type: String
    },
    proveedorId: {
      type: Schema.Types.ObjectId,
      ref: 'Proveedor'
    },
    facturaProformaFactura: {
      type: String
    },
    conceptoFactura: {
      type: String
    },
    tipoFactura: {
      type: String
    },
    procesoAuxId: {
      type: Schema.Types.ObjectId,
      ref: 'ProcesoAux'
    },
    montoFactura: {
      type: Number
    },
    abonoFactura: {
      type: Number
    },
    saldoFactura: {
      type: Number
    },
    estatusFactura: {
      type: String
    },
    userCreatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    facturaCreado: {
      type: Date,
      default: moment()
    },
    facturaModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
facturaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Factura = model('Factura', facturaSchema)

module.exports = Factura

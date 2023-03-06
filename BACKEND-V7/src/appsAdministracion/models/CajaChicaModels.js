const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const cajaChicaSchema = new Schema(
  {
    codigoCajaChica: {
      type: String
    },
    descripcionCajaChica: {
      type: String
    },

    ingresoMontoCajaChica: {
      type: Number
    },
    egresoMontoCajaChica: {
      type: Number
    },
    fechaEfectivaCajaChica: {
      type: Date,
      default: moment()
    },
    saldoTotalCajaChica: {
      type: Number
    },
    estatusCajaChica: {
      type: String
    },
    montoEntregadoCajaChica: {
      type: Number
    },
    montoVueltoCajaChica: {
      type: Number
    },
    estatusVueltoCajaChica: {
      type: String
    },
    proveedorId: {
      type: Schema.Types.ObjectId,
      ref: 'Proveedor'
    },
    centroDeCostoAuxId: {
      type: Schema.Types.ObjectId,
      ref: 'CentroDeCostoAux'
    },
    conceptoAuxId: {
      type: Schema.Types.ObjectId,
      ref: 'ConceptoAux'
    },
    creadoCajaChica: {
      type: Date,
      default: moment()
    },
    modificadoCajaChica: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
cajaChicaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const CajaChica = model('CajaChica', cajaChicaSchema)

module.exports = CajaChica

const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const PresupuestoSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    fechaRequeridaPresupuesto: {
      type: Date,
      default: moment()
    },
    codigoPresupuesto: {
      type: String
    },
    conceptoPresupuesto: {
      type: String
    },
    tipoPresupuesto: {
      type: String
    },
    actividadPresupuesto: {
      type: String
    },
    montoPresupuesto: {
      type: String
    },
    estatusPresupuesto: {
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
    PresupuestoCreado: {
      type: Date,
      default: moment()
    },
    PresupuestoModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
PresupuestoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Presupuesto = model('Presupuesto', PresupuestoSchema)

module.exports = Presupuesto

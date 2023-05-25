const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const proformaSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    codigoProforma: {
      type: String
    },
    proveedorId: {
      type: Schema.Types.ObjectId,
      ref: 'Proveedor'
    },
    numeroControlProforma: {
      type: String
    },
    fechaControlProforma: {
      type: Date,
      default: moment()
    },
    dominioId: {
      type: Schema.Types.ObjectId,
      ref: 'Dominio'
    },
    divisionId: {
      type: Schema.Types.ObjectId,
      ref: 'Division'
    },
    dependenciaId: {
      type: Schema.Types.ObjectId,
      ref: 'Dependencia'
    },
    subDependenciaId: {
      type: Schema.Types.ObjectId,
      ref: 'SubDependencia'
    },
    actividadAsociadaId: {
      type: Schema.Types.ObjectId,
      ref: 'ActividadAsociada'
    },
    clasificacionServicioId: {
      type: Schema.Types.ObjectId,
      ref: 'ClasificacionServicio'
    },
    usoFondoProforma: {
      type: String
    },
    ingresoProforma: {
      type: Number
    },
    egresoProforma: {
      type: Number
    },
    totalProforma: {
      type: Number
    },
    descripcionProforma: {
      type: String
    },
    estatusProforma: {
      type: String
    },

    userCreatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    creadoProforma: {
      type: Date,
      default: moment()
    },
    modificadoProforma: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
proformaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Proforma = model('Proforma', proformaSchema)

module.exports = Proforma

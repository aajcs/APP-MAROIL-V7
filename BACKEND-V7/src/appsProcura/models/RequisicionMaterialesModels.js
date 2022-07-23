const moment = require('moment') // require

const { Schema, model } = require('mongoose')

const requisicionMaterialesSchema = new Schema(
  {
    fechaElaboracion: {
      type: Date
    },
    fechaRequerida: {
      type: Date
    },
    elaboradoPor: {
      type: String
    },
    fechaElaboradoPor: {
      type: Date
    },
    aprobadoPor: {
      type: String
    },
    fechaAprobadoPor: {
      type: Date
    },
    observaiones: {
      type: String
    },
    correlativoRequisicion: {
      type: String
    },
    estatusRequisicionMateriales: {
      type: String
    },
    proyectoAuxId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ProyectoAux'
      }
    ],
    departamentoAuxId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'DepartamentoAux'
      }
    ],
    prioridadAuxId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'PrioridadAux'
      }
    ],
    activosId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Activos'
      }
    ],
    centroDeCostoAuxId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'CentroDeCostoAux'
      }
    ],
    requisicionMaterialesItemsId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'RequisicionMaterialesItems'
      }
    ],
    requisicionMaterialesCreado: {
      type: Date,
      default: moment()
    },
    requisicionMaterialesModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

requisicionMaterialesSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const RequisicionMateriales = model(
  'RequisicionMateriales',
  requisicionMaterialesSchema
)

module.exports = RequisicionMateriales

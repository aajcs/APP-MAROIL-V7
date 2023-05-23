const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const clasificacionServicioSchema = new Schema(
  {
    codigoClasificacionServicio: {
      type: String
    },
    nombreClasificacionServicio: {
      type: String
    },
    descripcionClasificacionServicio: {
      type: String
    },
    estatusClasificacionServicio: {
      type: String
    },
    creadoClasificacionServicio: {
      type: Date,
      default: moment()
    },
    modificadoClasificacionServicio: {
      type: Date,
      default: moment()
    },
    actividadAsociadaId: {
      type: Schema.Types.ObjectId,
      ref: 'ActividadAsociada'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
clasificacionServicioSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const ClasificacionServicio = model(
  'ClasificacionServicio',
  clasificacionServicioSchema
)

module.exports = ClasificacionServicio

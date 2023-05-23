const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const actividadAsociadaSchema = new Schema(
  {
    codigoActividadAsociada: {
      type: String
    },
    nombreActividadAsociada: {
      type: String
    },
    descripcionActividadAsociada: {
      type: String
    },
    estatusActividadAsociada: {
      type: String
    },
    creadoActividadAsociada: {
      type: Date,
      default: moment()
    },
    modificadoActividadAsociada: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
actividadAsociadaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const ActividadAsociada = model('ActividadAsociada', actividadAsociadaSchema)

module.exports = ActividadAsociada

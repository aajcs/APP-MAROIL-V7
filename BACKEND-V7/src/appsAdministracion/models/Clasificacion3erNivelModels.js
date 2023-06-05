const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const clasificacion3erNivelSchema = new Schema(
  {
    codigoClasificacion3erNivel: {
      type: String
    },
    nombreClasificacion3erNivel: {
      type: String
    },
    descripcionClasificacion3erNivel: {
      type: String
    },
    estatusClasificacion3erNivel: {
      type: String
    },
    creadoClasificacion3erNivel: {
      type: Date,
      default: moment()
    },
    modificadoClasificacion3erNivel: {
      type: Date,
      default: moment()
    },
    clasificacionServicioId: {
      type: Schema.Types.ObjectId,
      ref: 'ClasificacionServicio'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
clasificacion3erNivelSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Clasificacion3erNivel = model(
  'Clasificacion3erNivel',
  clasificacion3erNivelSchema
)

module.exports = Clasificacion3erNivel

const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const clasificacion4toNivelSchema = new Schema(
  {
    codigoClasificacion4toNivel: {
      type: String
    },
    nombreClasificacion4toNivel: {
      type: String
    },
    descripcionClasificacion4toNivel: {
      type: String
    },
    estatusClasificacion4toNivel: {
      type: String
    },
    creadoClasificacion4toNivel: {
      type: Date,
      default: moment()
    },
    modificadoClasificacion4toNivel: {
      type: Date,
      default: moment()
    },
    clasificacion3erNivelId: {
      type: Schema.Types.ObjectId,
      ref: 'Clasificacion3erNivel'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
clasificacion4toNivelSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Clasificacion4toNivel = model(
  'Clasificacion4toNivel',
  clasificacion4toNivelSchema
)

module.exports = Clasificacion4toNivel

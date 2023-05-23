const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const subDependenciaSchema = new Schema(
  {
    codigoSubDependencia: {
      type: String
    },
    nombreSubDependencia: {
      type: String
    },
    descripcionSubDependencia: {
      type: String
    },
    estatusSubDependencia: {
      type: String
    },
    creadoSubDependencia: {
      type: Date,
      default: moment()
    },
    modificadoSubDependencia: {
      type: Date,
      default: moment()
    },
    dependenciaId: {
      type: Schema.Types.ObjectId,
      ref: 'Dependencia'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
subDependenciaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const SubDependencia = model('SubDependencia', subDependenciaSchema)

module.exports = SubDependencia

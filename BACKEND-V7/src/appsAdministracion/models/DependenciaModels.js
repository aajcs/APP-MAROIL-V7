const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const dependenciaSchema = new Schema(
  {
    codigoDependencia: {
      type: String
    },
    nombreDependencia: {
      type: String
    },
    descripcionDependencia: {
      type: String
    },
    estatusDependencia: {
      type: String
    },
    creadoDependencia: {
      type: Date,
      default: moment()
    },
    modificadoDependencia: {
      type: Date,
      default: moment()
    },
    divisionId: {
      type: Schema.Types.ObjectId,
      ref: 'Division'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
dependenciaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Dependencia = model('Dependencia', dependenciaSchema)

module.exports = Dependencia

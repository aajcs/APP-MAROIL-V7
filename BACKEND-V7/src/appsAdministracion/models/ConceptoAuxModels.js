const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const conceptoAuxSchema = new Schema(
  {
    codigoConceptoAux: {
      type: String
    },
    nombreConceptoAux: {
      type: String
    },
    descripcionConceptoAux: {
      type: String
    },
    estatusConceptoAux: {
      type: String
    },
    conceptoCreado: {
      type: Date,
      default: moment()
    },
    conceptoModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
conceptoAuxSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const ConceptoAux = model('ConceptoAux', conceptoAuxSchema)

module.exports = ConceptoAux

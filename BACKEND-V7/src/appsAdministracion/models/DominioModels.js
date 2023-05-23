const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const dominioSchema = new Schema(
  {
    codigoDominio: {
      type: String
    },
    nombreDominio: {
      type: String
    },
    descripcionDominio: {
      type: String
    },
    estatusDominio: {
      type: String
    },
    creadoDominio: {
      type: Date,
      default: moment()
    },
    modificadoDominio: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
dominioSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Dominio = model('Dominio', dominioSchema)

module.exports = Dominio

const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const costoTmMesSchema = new Schema(
  {
    codigoCostoTmMes: {
      type: String
    },
    nombreCostoTmMes: {
      type: String
    },
    costoCostoTmMes: {
      type: Number
    },
    fechaEfectivaCostoTmMes: {
      type: Date,
      default: moment()
    },
    estatusCostoTmMes: {
      type: String
    },
    creadoCostoTmMes: {
      type: Date,
      default: moment()
    },
    modificadoCostoTmMes: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
costoTmMesSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const CostoTmMes = model('CostoTmMes', costoTmMesSchema)

module.exports = CostoTmMes

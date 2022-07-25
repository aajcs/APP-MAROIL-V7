const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const centroDeCostoAuxSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    codigoCentroDeCosto: {
      type: String
    },
    nombreCentroDeCosto: {
      type: String
    },
    descripcionCentroDeCosto: {
      type: String
    },
    estatusCentroDeCosto: {
      type: String
    },
    centroDeCostoAuxCreado: {
      type: Date,
      default: moment()
    },
    centroDeCostoAuxModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
centroDeCostoAuxSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const CentroDeCostoAux = model('CentroDeCostoAux', centroDeCostoAuxSchema)

module.exports = CentroDeCostoAux

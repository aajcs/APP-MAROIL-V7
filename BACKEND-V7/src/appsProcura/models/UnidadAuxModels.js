const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const unidadAuxSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    nombreUnidad: {
      type: String
    },
    descripcionUnidad: {
      type: String
    },
    estatusUnidad: {
      type: String
    },
    unidadAuxCreado: {
      type: Date,
      default: moment()
    },
    unidadAuxModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
unidadAuxSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const UnidadAux = model('UnidadAux', unidadAuxSchema)

module.exports = UnidadAux

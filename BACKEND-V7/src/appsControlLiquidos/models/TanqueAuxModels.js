const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const tanqueAuxSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    nombreTanqueAux: {
      type: String
    },
    descripcionTanqueAux: {
      type: String
    },
    estatusTanqueAux: {
      type: String
    },
    ubicacionTanqueAux: {
      type: String
    },
    volumenActualTanqueAux: {
      type: Number,
      default: 0
    },
    volumenCapacidadTanqueAux: {
      type: Number,
      default: 0
    },
    tipoCargaTanqueAux: {
      type: String
    },
    embarcacion: {
      type: Schema.Types.ObjectId,
      ref: 'Embarcacion'
    },
    tanqueAuxCreado: {
      type: Date,
      default: moment()
    },
    tanqueAuxModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
tanqueAuxSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const TanqueAux = model('TanqueAux', tanqueAuxSchema)

module.exports = TanqueAux

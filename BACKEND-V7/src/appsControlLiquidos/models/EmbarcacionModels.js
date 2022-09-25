const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const embarcacionSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    nombreEmbarcacion: {
      type: String
    },
    descripcionEmbarcacion: {
      type: String
    },
    estatusEmbarcacion: {
      type: String
    },
    ubicacionEmbarcacion: {
      type: String
    },
    combustibleActualEmbarcacion: {
      type: Number,
      default: 0
    },
    combustibleCapacidadEmbarcacion: {
      type: Number,
      default: 0
    },
    embarcacionCreado: {
      type: Date,
      default: moment()
    },
    embarcacionModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
embarcacionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Embarcacion = model('Embarcacion', embarcacionSchema)

module.exports = Embarcacion

const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const presupuestoPMSchema = new Schema(
  {
    descripcionPresupuestoPM: {
      type: String,
      trim: true
    },
    montoPresupuestoPM: {
      type: Number
    },

    proveedorId: {
      type: Schema.Types.ObjectId,
      ref: 'Proveedor'
    },
    fechaEstimadaPresupuestoPM: {
      type: Date,
      default: moment()
    },
    archivoSoportePresupuestoPM: {
      type: String
    },

    creadoPresupuestoPM: {
      type: Date,
      default: moment()
    },
    modificadoPresupuestoPM: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
presupuestoPMSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const PresupuestoPM = model('PresupuestoPM', presupuestoPMSchema)

module.exports = PresupuestoPM

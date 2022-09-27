const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const cargaViajeSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    tipoCargaViaje: {
      type: String
    },
    productoCargaViaje: {
      type: String
    },
    descripcionCargaViaje: {
      type: String
    },
    puertoCargaViaje: {
      type: String
    },
    estatusCargaViaje: {
      type: String
    },
    etcCargaViaje: {
      type: String
    },
    etaCargaViaje: {
      type: String
    },
    etdCargaViaje: {
      type: String
    },
    rataCargaViaje: {
      type: String
    },

    catidadActualCargaViaje: {
      type: Number,
      default: 0
    },
    catidadPruductoCargaViaje: {
      type: Number,
      default: 0
    },
    viaje: {
      type: Schema.Types.ObjectId,
      ref: 'Viaje'
    },
    fechaInicioCargaViaje: {
      type: Date,
      default: moment()
    },
    fechaFinCargaViaje: {
      type: Date,
      default: moment()
    },
    cargaViajeCreado: {
      type: Date,
      default: moment()
    },
    cargaViajeModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
cargaViajeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const CargaViaje = model('CargaViaje', cargaViajeSchema)

module.exports = CargaViaje

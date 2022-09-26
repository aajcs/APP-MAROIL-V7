const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const viajeSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    nombreViaje: {
      type: String
    },
    descripcionViaje: {
      type: String
    },
    estatusViaje: {
      type: String
    },
    destinoViaje: {
      type: String
    },
    etcViaje: {
      type: String
    },
    etaViaje: {
      type: String
    },
    etdViaje: {
      type: String
    },
    tipoCargaViaje: {
      type: String
    },
    cantidadCargaViaje: {
      type: String
    },
    cantidadActualCargaViaje: {
      type: String
    },
    rataCargaViaje: {
      type: String
    },
    fechaInicioViaje: {
      type: Date,
      default: moment()
    },
    fechaFinViaje: {
      type: Date,
      default: moment()
    },

    embarcacion: { type: String },
    remolcador: { type: String },
    // embarcacion: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Embarcacion'
    //   }
    // ],
    // remolcador: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Remolcador'
    //   }
    // ],
    viajeCreado: {
      type: Date,
      default: moment()
    },
    viajeModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
viajeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Viaje = model('Viaje', viajeSchema)

module.exports = Viaje

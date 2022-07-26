const moment = require('moment') // require

const { Schema, model } = require('mongoose')

const barcoSchema = new Schema(
  {
    nombreBarco: {
      type: String,
      required: true,
      unique: true
    },
    descripcion: {
      type: String
    },
    buqueCliente: {
      type: String
    },
    buqueClienteVenta: {
      type: String
    },
    buquePaisDestino: {
      type: String
    },
    toneladasCapacidad: {
      type: Number,
      default: 0
    },
    toneladasNominadas: {
      type: Number,
      default: 0
    },
    toneladasActual: {
      type: Number,
      default: 0
    },
    blFinalBuque: {
      type: Number,
      default: 0
    },
    totalGabarras: {
      type: Number,
      default: 0
    },
    cantidadBodegas: {
      type: Number,
      default: 0
    },
    cantidadGruas: {
      type: Number,
      default: 0
    },
    fechaAtraco: {
      type: Date
    },
    fechaInicioCarga: {
      type: Date
    },
    fechaFinalCarga: {
      type: Date
    },
    estatusBarco: {
      type: String
    },
    reporteCarga: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ReporteCarga'
      }
    ],
    reporteCargaGOM: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ReporteCargaGOM'
      }
    ],
    cargaBodega: [
      {
        type: Schema.Types.ObjectId,
        ref: 'CargaBodega'
      }
    ],
    volumetriaId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Volumetria'
      }
    ],
    barcoCreado: {
      type: Date,
      default: moment()
    },
    barcoModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

barcoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Barco = model('Barco', barcoSchema)

module.exports = Barco

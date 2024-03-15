const { Schema, model } = require('mongoose')

const buqueSchema = new Schema(
  {
    nombreBuque: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    descripcionBuque: {
      type: String
    },
    clienteBuque: {
      type: String
    },
    clienteVentaBuque: {
      type: String
    },
    paisDestinoBuque: {
      type: String
    },
    capacidadBuque: {
      type: Number,
      default: 0
    },
    capacidadNominadaBuque: {
      type: Number,
      default: 0
    },
    capacidadActualBuque: {
      type: Number,
      default: 0
    },
    blFinalBuque: {
      type: Number,
      default: 0
    },
    etcBuque: {
      type: String
    },
    totalGabarras: {
      type: Number,
      default: 0
    },
    cantidadBodegas: {
      type: Number,
      default: 0
    },
    tiempoDemora: {
      type: Number,
      default: 0
    },
    costoDemora: {
      type: Number,
      default: 0
    },
    cantidadGruasBuque: {
      type: Number,
      default: 0
    },
    fechaAtracoBuque: {
      type: Date
    },
    fechaInicioCargaBuque: {
      type: Date
    },
    fechaFinalCargaBuque: {
      type: Date
    },
    estatusBuque: {
      type: String
    },
    reporteCargaBuque: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ReporteCarga'
      }
    ],
    reporteCargaGOMBuque: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ReporteCargaBuque'
      }
    ],
    cargaBodegaBuque: [
      {
        type: Schema.Types.ObjectId,
        ref: 'CargaBodega'
      }
    ],
    volumetriaIdBuque: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Volumetria'
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

buqueSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Buque = model('Buque', buqueSchema)

module.exports = Buque

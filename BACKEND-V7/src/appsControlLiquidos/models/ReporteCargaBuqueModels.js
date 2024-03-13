const { Schema, model } = require('mongoose')

const reporteCargaBuqueSchema = new Schema(
  {
    buqueID: {
      type: Schema.Types.ObjectId,
      ref: 'Buque'
    },
    ubicacionBuque: {
      type: String,
      required: true
    },
    puestoTerminalBuque: {
      type: String
    },
    nombreFeederBuque: {
      type: String
    },
    capacidadFeederBuque: {
      type: Number,
      default: 0,
      required: true
    },
    fechaInicioFeederBuque: {
      type: Date
    },
    fechaFinFeederBuque: {
      type: Date
    },
    materialCargadoBuque: {
      type: Number,
      default: 0,
      required: true
    },
    tasaDeCargaBuque: {
      type: Number,
      default: 0,
      required: true
    },
    etcBuque: {
      type: String
    },
    comentariosBuque: {
      type: String
    },
    observacionesBuque: {
      type: String
    },
    climaBuque: {
      type: String
    },
    vientoBuque: {
      type: String
    },
    mareaBuque: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
reporteCargaBuqueSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const ReporteCargaBuque = model('ReporteCargaBuque', reporteCargaBuqueSchema)

module.exports = ReporteCargaBuque

const moment = require('moment') // require

const { Schema, model } = require('mongoose')

const gabarraSchema = new Schema(
  {
    nombreGabarra: {
      type: String,
      required: true,
      unique: true
    },
    descripcion: {
      type: String,
      required: true
    },
    toneladasCapacidad: {
      type: Number,
      default: 0
    },
    toneladasActual: {
      type: Number,
      default: 0
    },
    toneladasRemanente: {
      type: Number,
      default: 0
    },
    trenesCapacidad: {
      type: Number,
      default: 0
    },
    trenesActual: {
      type: Number,
      default: 0
    },
    estatusGabarra: {
      type: String
    },

    gabarraCreado: {
      type: Date,
      default: moment()
    },
    gabarraModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
gabarraSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Gabarra = model('Gabarra', gabarraSchema)

module.exports = Gabarra

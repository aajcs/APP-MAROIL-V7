const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const divisionSchema = new Schema(
  {
    codigoDivision: {
      type: String
    },
    nombreDivision: {
      type: String
    },
    descripcionDivision: {
      type: String
    },
    estatusDivision: {
      type: String
    },
    creadoDivision: {
      type: Date,
      default: moment()
    },
    modificadoDivision: {
      type: Date,
      default: moment()
    },
    dominioId: {
      type: Schema.Types.ObjectId,
      ref: 'Dominio'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
divisionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Division = model('Division', divisionSchema)

module.exports = Division

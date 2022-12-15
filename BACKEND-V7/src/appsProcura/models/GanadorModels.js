const { Schema, model } = require('mongoose')

const ganadorSchema = new Schema({
  // requisicionMaterialesId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'RequisicionMateriales'
  // },
  nombreGanador: {
    type: String
  },
  estatusGanador: {
    type: String
  }
})
ganadorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Ganador = model('Ganador', ganadorSchema)

module.exports = Ganador

const { Schema, model } = require('mongoose')

const concursanteSchema = new Schema({
  // requisicionMaterialesId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'RequisicionMateriales'
  // },
  nombreConcursante: {
    type: String
  },
  estatusConcursante: {
    type: String
  }
})
concursanteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Concursante = model('Concursante', concursanteSchema)

module.exports = Concursante

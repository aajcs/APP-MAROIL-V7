const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const remolcadorSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    nombreRemolcador: {
      type: String
    },
    descripcionRemolcador: {
      type: String
    },
    estatusRemolcador: {
      type: String
    },
    ubicacionRemolcador: {
      type: String
    },
    combustibleActualRemolcador: {
      type: Number,
      default: 0
    },
    combustibleCapacidadRemolcador: {
      type: Number,
      default: 0
    },
    remolcadorCreado: {
      type: Date,
      default: moment()
    },
    remolcadorModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
remolcadorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Remolcador = model('Remolcador', remolcadorSchema)

module.exports = Remolcador

const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const departamentoAuxSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    nombreDepartamento: {
      type: String
    },
    descripcionDepartamento: {
      type: String
    },
    estatusDepartamento: {
      type: String
    },
    departamentoAuxCreado: {
      type: Date,
      default: moment()
    },
    departamentoAuxModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
departamentoAuxSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const DepartamentoAux = model('DepartamentoAux', departamentoAuxSchema)

module.exports = DepartamentoAux

const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const proyectoAuxSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    nombreProyecto: {
      type: String
    },
    descripcionProyecto: {
      type: String
    },
    estatusProyecto: {
      type: String
    },
    proyectoAuxCreado: {
      type: Date,
      default: moment()
    },
    proyectoAuxModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
proyectoAuxSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const ProyectoAux = model('ProyectoAux', proyectoAuxSchema)

module.exports = ProyectoAux

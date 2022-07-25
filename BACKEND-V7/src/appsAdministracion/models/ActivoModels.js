const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const activoSchema = new Schema(
  {
    // requisicionMaterialesId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'RequisicionMateriales'
    // },
    codigoActivo: {
      type: String
    },
    nombreActivo: {
      type: String
    },
    descripcionActivo: {
      type: String
    },
    areaActivo: {
      type: String
    },
    tipoActivo: {
      type: String
    },
    modeloActivo: {
      type: Number
    },
    serialActivo: {
      type: Number
    },
    estatusActivo: {
      type: String
    },
    userCreatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    activoCreado: {
      type: Date,
      default: moment()
    },
    activoModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
activoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Activo = model('Activo', activoSchema)

module.exports = Activo

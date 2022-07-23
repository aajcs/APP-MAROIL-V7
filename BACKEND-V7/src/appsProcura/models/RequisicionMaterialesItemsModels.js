const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const requisicionMaterialesItemsSchema = new Schema(
  {
    requisicionMaterialesId: {
      type: Schema.Types.ObjectId,
      ref: 'RequisicionMateriales'
    },
    cantidadMaterial: {
      type: Number,
      default: 0
    },
    unidadAuxId: {
      type: Schema.Types.ObjectId,
      ref: 'UnidadAux'
    },
    descripcionMateial: {
      type: String
    },
    informacionAdicional: {
      type: String
    },
    imagenReferencia: {
      type: String
    },
    estatusrequisicionMaterialesItems: {
      type: String
    },
    requisicionMaterialesItemsCreado: {
      type: Date,
      default: moment()
    },
    requisicionMaterialesItemsModificado: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
requisicionMaterialesItemsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const RequisicionMaterialesItems = model(
  'RequisicionMaterialesItems',
  requisicionMaterialesItemsSchema
)

module.exports = RequisicionMaterialesItems

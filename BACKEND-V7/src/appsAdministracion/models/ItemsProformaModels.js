const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const itemsProformaSchema = new Schema(
  {
    codigoItemsProforma: {
      type: String
    },
    descripcionItemsProforma: {
      type: String
    },

    fechaInicioItemsProforma: {
      type: Date,
      default: moment()
    },
    fechaFinItemsProforma: {
      type: Date,
      default: moment()
    },
    unidadItemsProforma: {
      type: String
    },
    cantidadItemsProforma: {
      type: Number
    },
    precioUnitarioItemsProforma: {
      type: Number
    },
    precioTotalItemsProforma: {
      type: Number
    },
    estatus1ItemsProforma: {
      type: String
    },
    estatus2ItemsProforma: {
      type: String
    },
    creadoItemsProforma: {
      type: Date,
      default: moment()
    },
    modificadoItemsProforma: {
      type: Date,
      default: moment()
    },
    proformaId: {
      type: Schema.Types.ObjectId,
      ref: 'Proforma'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
itemsProformaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const ItemsProforma = model('ItemsProforma', itemsProformaSchema)

module.exports = ItemsProforma

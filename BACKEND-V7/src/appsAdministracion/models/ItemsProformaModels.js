const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const itemsProformaSchema = new Schema(
  {
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

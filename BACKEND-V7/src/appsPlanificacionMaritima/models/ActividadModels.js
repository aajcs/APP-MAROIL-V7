const moment = require('moment') // require
const { Schema, model } = require('mongoose')

const actividadSchema = new Schema(
  {
    codigoActividad: {
      type: String,
      trim: true
    },
    embarcacionId: {
      type: Schema.Types.ObjectId,
      ref: 'Embarcacion',
      required: true
    },
    procesoActividad: {
      type: String,
      trim: true
    },
    descripcionActividad: {
      type: String,
      trim: true
    },
    nivelPrioridadActividad: {
      type: String,
      trim: true
    },
    imagenDefectoActividad: {
      public_id: String,
      url: String
    },
    imagenAvanceActividad: {
      public_id: String,
      url: String
    },

    estatusActividad: {
      type: String,
      trim: true
    },
    responsableUsuarioId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    presupuestoActididadId: {
      type: Schema.Types.ObjectId,
      ref: 'PresupuestoActividad'
    },
    proveedorId: {
      type: Schema.Types.ObjectId,
      ref: 'Proveedor'
    },
    fechaInicioActividad: {
      type: Date,
      default: moment()
    },
    fechaFinActividad: {
      type: Date,
      default: moment()
    },
    creadoActividad: {
      type: Date,
      default: moment()
    },
    modificadoActividad: {
      type: Date,
      default: moment()
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
actividadSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Actividad = model('Actividad', actividadSchema)

module.exports = Actividad

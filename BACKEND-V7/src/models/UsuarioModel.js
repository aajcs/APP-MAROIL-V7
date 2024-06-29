const moment = require('moment') // require

const { Schema, model } = require('mongoose')
const bcrypy = require('bcryptjs')

const usaurioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true
      // unique: true
    },
    correo: {
      type: String,
      required: true,
      unique: true
    },
    user: {
      type: String,
      // required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    rolesMaroilConnect: [
      {
        type: String,
        required: true,
        default: 'NotRol'
      }
    ],
    chatMaroilConnect: {
      type: Boolean
      // required: true,
      // default: true
    },

    roles: [
      {
        type: String,
        required: true,
        default: 'NotRol'
      }
    ],
    apps: [
      {
        type: String,
        required: true,
        default: 'Notapp'
      }
    ],
    usuariocreado: {
      type: Date,
      default: moment()
    },
    usuariomodificado: {
      type: Date,
      default: moment()
    }
  },
  // manda a la base de datos el valor de cuando se modifica y cuando se crea y desabilita lo de la version tengo que ver si me sirve
  {
    timestamps: true,
    versionKey: false
  }
)
// verifica el password enviador por el usuario contra con que tiene en la base de datos
usaurioSchema.methods.verifyPassword = function (password) {
  return bcrypy.compare(password, this.password)
}
// encripta la informacion que va a la base de datos
usaurioSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypy.genSalt(10)
  return bcrypy.hash(password, salt)
}
// trasforma como envia el json al cliente
usaurioSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    // delete returnedObject.__v
  }
})
// manera de exportar el archivo de midudev para que sea una instanacia o algo asi
const User = model('User', usaurioSchema)

module.exports = User
// manera de exportar de la api inventario que esta en youtube
// module.exports = model('User', usaurioSchema)

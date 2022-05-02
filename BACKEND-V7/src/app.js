const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const createAdmin = require('./libs/initialSetup')
const app = express()
createAdmin()
// const { mongoose } = require('./database');
// require('./database');
// Settings
app.set('port', process.env.PORT || 4000)

// Middlewares

// permite ver lo que se envia por el request
app.use(morgan('dev'))

// esto lo que permite es que cualquier origen pueda ingresar a la api
app.use(cors())
// recibe lo que viene en el boby de la request y lo parsea o transforma a formato json
app.use(express.json())
// el codigo se lee de arriba abajo y el use es lo q la api lee el next es para ir al siguiente patch
app.use((req, res, next) => {
  console.log(req.method)
  console.log(req.path)
  console.log(req.body)
  console.log(req.headers)
  next()
})
// Routes
// app.use('/api/barcos', require('./routes/barcosRoute'));
app.use('/api/barco', require('./appsControl/routes/BarcoRoutes'))
app.use('/api/gabarra', require('./appsControl/routes/GabarraRoutes'))
app.use('/api/usuario', require('./routes/UsuarioRoutes'))
// app.use('/api/reportehora', require('./routes/ReporteHoraRoutes'));
app.use('/api/reporteCarga', require('./appsControl/routes/ReporteCargaRoutes'))
app.use(
  '/api/reporteCargaGOM',
  require('./appsControl/routes/ReporteCargaGOMRoutes')
)
app.use('/api/cargaBodega', require('./appsControl/routes/CargaBodegaRoutes'))
// Static Files
// app.use(express.static(path.join(__dirname, '../public')));;
app.use((req, res) => {
  res.status(404).json({
    error: 'not found'
  })
})

module.exports = app

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
app.use(
  '/api/programacionVentana',
  require('./appsControl/routes/ProgramacionVentanaRoutes')
)
app.use('/api/gabarra', require('./appsControl/routes/GabarraRoutes'))
app.use('/api/usuario', require('./routes/UsuarioRoutes'))
// app.use('/api/reportehora', require('./routes/ReporteHoraRoutes'));
app.use('/api/reporteCarga', require('./appsControl/routes/ReporteCargaRoutes'))
app.use(
  '/api/reporteCargaGOM',
  require('./appsControl/routes/ReporteCargaGOMRoutes')
)
app.use('/api/cargaBodega', require('./appsControl/routes/CargaBodegaRoutes'))
app.use('/api/volumetria', require('./appsControl/routes/VolumetriaRoutes'))
app.use(
  '/api/requisicionMateriales',
  require('./appsProcura/routes/RequisicionMaterialesRoutes')
)
app.use('/api/proyectoAux', require('./appsProcura/routes/ProyectoAuxRoutes'))
app.use('/api/prioridadAux', require('./appsProcura/routes/PrioridadAuxRoutes'))
app.use('/api/unidadAux', require('./appsProcura/routes/UnidadAuxRoutes'))
app.use(
  '/api/departamentoAux',
  require('./appsProcura/routes/DepartamentoAuxRoutes')
)
app.use(
  '/api/centroDeCostoAux',
  require('./appsAdministracion/routes/CentroDeCostoAuxRoutes')
)
app.use(
  '/api/RequisicionMaterialesItems',
  require('./appsProcura/routes/RequisicionMaterialesItemsRoutes')
)
app.use(
  '/api/proveedor',
  require('./appsAdministracion/routes/ProveedorRoutes')
)
app.use('/api/Activo', require('./appsAdministracion/routes/ActivoRoutes'))
app.use('/api/Factura', require('./appsAdministracion/routes/FacturaRoutes'))
app.use(
  '/api/Presupuesto',
  require('./appsAdministracion/routes/PresupuestoRoutes')
)
app.use(
  '/api/IngresoGasto',
  require('./appsAdministracion/routes/IngresoGastoRoutes')
)
app.use(
  '/api/Remolcador',
  require('./appsControlLiquidos/routes/RemolcadorRoutes')
)
app.use(
  '/api/Embarcacion',
  require('./appsControlLiquidos/routes/EmbarcacionRoutes')
)
app.use('/api/viaje', require('./appsControlLiquidos/routes/ViajeRoutes'))
app.use(
  '/api/cargaViaje',
  require('./appsControlLiquidos/routes/CargaViajeRoutes')
)
app.use(
  '/api/tanqueAux',
  require('./appsControlLiquidos/routes/TanqueAuxRoutes')
)
app.use('/api/ViajeAux', require('./appsControlLiquidos/routes/ViajeAuxRoutes'))
app.use(
  '/api/GastosOperacionale',
  require('./appsControlLiquidos/routes/GastosOperacionaleRoutes')
)
// Static Files
// app.use(express.static(path.join(__dirname, '../public')));;
app.use((req, res) => {
  res.status(404).json({
    error: 'not found'
  })
})

module.exports = app

const cargaViajeCtrl = {}

const CargaViaje = require('../models/CargaViajeModels')

cargaViajeCtrl.createCargaViaje = async (req, res) => {
  const {
    tipoCargaViaje,
    productoCargaViaje,
    descripcionCargaViaje,
    puertoCargaViaje,
    estatusCargaViaje,
    etcCargaViaje,
    etaCargaViaje,
    etdCargaViaje,
    catidadActualCargaViaje,
    catidadPruductoCargaViaje,
    rataCargaViaje,
    fechaInicioCargaViaje,
    fechaFinCargaViaje,
    viaje,
    cargaViajeCreado,
    cargaViajeModificado
  } = req.body
  try {
    const newCargaViaje = new CargaViaje({
      tipoCargaViaje,
      productoCargaViaje,
      descripcionCargaViaje,
      puertoCargaViaje,
      estatusCargaViaje,
      etcCargaViaje,
      etaCargaViaje,
      etdCargaViaje,
      catidadActualCargaViaje,
      catidadPruductoCargaViaje,
      rataCargaViaje,
      fechaInicioCargaViaje,
      fechaFinCargaViaje,
      viaje,
      cargaViajeCreado,
      cargaViajeModificado
    })
    const saveCargaViaje = await newCargaViaje.save()

    res.status(200).json({
      saveCargaViaje,
      message: 'Nuevo CargaViaje Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

cargaViajeCtrl.getCargaViajes = async (req, res) => {
  try {
    const cargaViaje = await CargaViaje.find({}).populate('viaje')
    res.status(200).json(cargaViaje)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

cargaViajeCtrl.getCargaViaje = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const cargaViaje = await CargaViaje.findById(id)
    if (cargaViaje) {
      res.status(200).json(cargaViaje)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

cargaViajeCtrl.updateCargaViaje = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    tipoCargaViaje,
    productoCargaViaje,
    descripcionCargaViaje,
    puertoCargaViaje,
    estatusCargaViaje,
    etcCargaViaje,
    etaCargaViaje,
    etdCargaViaje,
    catidadActualCargaViaje,
    catidadPruductoCargaViaje,
    rataCargaViaje,
    fechaInicioCargaViaje,
    fechaFinCargaViaje,
    viaje,
    cargaViajeCreado,
    cargaViajeModificado
  } = req.body

  try {
    const updateCargaViaje = await CargaViaje.findByIdAndUpdate(
      id,
      {
        tipoCargaViaje,
        productoCargaViaje,
        descripcionCargaViaje,
        puertoCargaViaje,
        estatusCargaViaje,
        etcCargaViaje,
        etaCargaViaje,
        etdCargaViaje,
        catidadActualCargaViaje,
        catidadPruductoCargaViaje,
        rataCargaViaje,
        fechaInicioCargaViaje,
        fechaFinCargaViaje,
        viaje,
        cargaViajeCreado,
        cargaViajeModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateCargaViaje,
      message: 'CargaViaje Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

cargaViajeCtrl.deleteCargaViaje = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await CargaViaje.findByIdAndDelete(id)
    res.status(200).json({
      message: 'CargaViaje Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = cargaViajeCtrl

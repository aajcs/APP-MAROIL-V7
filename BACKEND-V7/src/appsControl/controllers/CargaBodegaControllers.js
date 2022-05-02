const cargaBodegaCtrl = {}

const Barco = require('../models/BarcoModels')
const CargaBodega = require('../models/CargaBodegaModels')

cargaBodegaCtrl.createCargaBodega = async (req, res) => {
  const {
    barcoID,
    nombreBodega,
    toneladasCargadasBodega,
    toneladasCapacidadBodega,
    estatusBodega,
    cargaBodegaCreado,
    cargaBodegaModificado
  } = req.body

  const barcoFindID = await Barco.findById(barcoID)
  if (!barcoFindID) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }

  const newCargaBodega = new CargaBodega({
    barcoID: barcoFindID._id,
    nombreBodega,
    toneladasCargadasBodega,
    toneladasCapacidadBodega,
    estatusBodega,
    cargaBodegaCreado,
    cargaBodegaModificado
  })
  try {
    const savenewCargaBodega1 = await newCargaBodega.save()
    barcoFindID.cargaBodega = barcoFindID.cargaBodega.concat(
      savenewCargaBodega1._id
    )
    await barcoFindID.save()

    const savenewCargaBodega = await CargaBodega.findById(
      savenewCargaBodega1._id
    ).populate('barcoID')

    res.status(200).json({
      savenewCargaBodega,
      message: 'Nuevo CargaBodega Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

cargaBodegaCtrl.getCargaBodegas = async (req, res) => {
  try {
    const cargaBodegas = await CargaBodega.find({}).populate('barcoID')
    res.status(200).json(cargaBodegas)
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

cargaBodegaCtrl.getCargaBodega = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const cargaBodega = await CargaBodega.findById(id).populate('barcoID', {
      nombre: 1
    })
    if (cargaBodega) {
      res.status(200).json(cargaBodega)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

cargaBodegaCtrl.updateCargaBodega = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    barcoID,
    nombreBodega,
    toneladasCargadasBodega,
    toneladasCapacidadBodega,
    estatusBodega,
    cargaBodegaCreado,
    cargaBodegaModificado
  } = req.body

  try {
    const updateCargaBodega = await CargaBodega.findByIdAndUpdate(
      id,
      {
        barcoID,
        nombreBodega,
        toneladasCargadasBodega,
        toneladasCapacidadBodega,
        estatusBodega,
        cargaBodegaCreado,
        cargaBodegaModificado
      },
      { new: true }
    ).populate('barcoID')

    res.status(200).json({
      updateCargaBodega,
      message: 'CargaBodega Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

cargaBodegaCtrl.deleteCargaBodega = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await CargaBodega.findByIdAndDelete(id)
    res.status(200).json({
      message: 'CargaBodega Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = cargaBodegaCtrl

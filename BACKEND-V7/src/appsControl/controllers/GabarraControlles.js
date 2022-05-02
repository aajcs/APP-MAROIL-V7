const gabarraCtrl = {}

const Gabarra = require('../models/GabarraModels')

gabarraCtrl.createGabarra = async (req, res) => {
  const {
    nombreGabarra,
    descripcion,
    toneladasCapacidad,
    toneladasActual,
    toneladasRemanente,
    trenesCapacidad,
    trenesActual,
    estatusGabarra
  } = req.body
  try {
    const newGabarra = new Gabarra({
      nombreGabarra,
      descripcion,
      toneladasCapacidad,
      toneladasActual,
      toneladasRemanente,
      trenesCapacidad,
      trenesActual,
      estatusGabarra
    })
    const saveGabarra = await newGabarra.save()

    res.status(200).json({
      saveGabarra,
      message: 'Nuevo Gabarra Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

gabarraCtrl.getGabarras = async (req, res) => {
  try {
    const gabarra = await Gabarra.find({})
    res.status(200).json(gabarra)
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

gabarraCtrl.getGabarra = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const gabarra = await Gabarra.findById(id)
    if (gabarra) {
      res.status(200).json(gabarra)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

gabarraCtrl.updateGabarra = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    nombreGabarra,
    descripcion,
    toneladasCapacidad,
    toneladasActual,
    toneladasRemanente,
    trenesCapacidad,
    trenesActual,
    estatusGabarra,
    gabarraCreado,
    gabarraModificado
  } = req.body

  try {
    const updategabarra = await Gabarra.findByIdAndUpdate(
      id,
      {
        nombreGabarra,
        descripcion,
        toneladasCapacidad,
        toneladasActual,
        toneladasRemanente,
        trenesCapacidad,
        trenesActual,
        estatusGabarra,
        gabarraCreado,
        gabarraModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updategabarra,
      message: 'Gabarra Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

gabarraCtrl.deleteGabarra = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Gabarra.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Gabarra Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = gabarraCtrl

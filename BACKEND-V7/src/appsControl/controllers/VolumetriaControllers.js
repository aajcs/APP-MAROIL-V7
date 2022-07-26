const volumetriaCtrl = {}

const Volumetria = require('../models/VolumetriaModels')

volumetriaCtrl.createVolumetria = async (req, res) => {
  const {
    barcoID,
    terminalAuxId,
    centroDeCostoAuxId,
    blFinalVolumetria,
    fechaBlFinalVolumetria,
    volumetriaCreado,
    volumetriaModificado
  } = req.body
  try {
    const newVolumetria = new Volumetria({
      barcoID,
      terminalAuxId,
      centroDeCostoAuxId,
      blFinalVolumetria,
      fechaBlFinalVolumetria,
      volumetriaCreado,
      volumetriaModificado
    })
    const saveVolumetria = await newVolumetria.save()

    res.status(200).json({
      saveVolumetria,
      message: 'Nuevo Volumetria Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

volumetriaCtrl.getVolumetrias = async (req, res) => {
  try {
    const volumetria = await Volumetria.find({})
    res.status(200).json(volumetria)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

volumetriaCtrl.getVolumetria = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const volumetria = await Volumetria.findById(id)
    if (volumetria) {
      res.status(200).json(volumetria)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

volumetriaCtrl.updateVolumetria = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    barcoID,
    terminalAuxId,
    centroDeCostoAuxId,
    blFinalVolumetria,
    fechaBlFinalVolumetria,
    volumetriaCreado,
    volumetriaModificado
  } = req.body

  try {
    const updateVolumetria = await Volumetria.findByIdAndUpdate(
      id,
      {
        barcoID,
        terminalAuxId,
        centroDeCostoAuxId,
        blFinalVolumetria,
        fechaBlFinalVolumetria,
        volumetriaCreado,
        volumetriaModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateVolumetria,
      message: 'Volumetria Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

volumetriaCtrl.deleteVolumetria = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Volumetria.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Volumetria Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = volumetriaCtrl

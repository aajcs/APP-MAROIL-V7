const tanqueAuxCtrl = {}

const TanqueAux = require('../models/TanqueAuxModels')

tanqueAuxCtrl.createTanqueAux = async (req, res) => {
  const {
    nombreTanqueAux,
    descripcionTanqueAux,
    estatusTanqueAux,
    ubicacionTanqueAux,
    volumenActualTanqueAux,
    volumenCapacidadTanqueAux,
    tipoCargaTanqueAux,
    embarcacion,
    tanqueAuxCreado,
    tanqueAuxModificado
  } = req.body
  try {
    const newTanqueAux = new TanqueAux({
      nombreTanqueAux,
      descripcionTanqueAux,
      estatusTanqueAux,
      ubicacionTanqueAux,
      volumenActualTanqueAux,
      volumenCapacidadTanqueAux,
      tipoCargaTanqueAux,
      embarcacion,
      tanqueAuxCreado,
      tanqueAuxModificado
    })
    const saveTanqueAux = await newTanqueAux.save()

    res.status(200).json({
      saveTanqueAux,
      message: 'Nuevo TanqueAux Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

tanqueAuxCtrl.getTanqueAuxs = async (req, res) => {
  try {
    const tanqueAux = await TanqueAux.find({}).populate('embarcacion')
    res.status(200).json(tanqueAux)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

tanqueAuxCtrl.getTanqueAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const tanqueAux = await TanqueAux.findById(id)
    if (tanqueAux) {
      res.status(200).json(tanqueAux)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

tanqueAuxCtrl.updateTanqueAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    nombreTanqueAux,
    descripcionTanqueAux,
    estatusTanqueAux,
    ubicacionTanqueAux,
    volumenActualTanqueAux,
    volumenCapacidadTanqueAux,
    tipoCargaTanqueAux,
    embarcacion,
    tanqueAuxCreado,
    tanqueAuxModificado
  } = req.body

  try {
    const updateTanqueAux = await TanqueAux.findByIdAndUpdate(
      id,
      {
        nombreTanqueAux,
        descripcionTanqueAux,
        estatusTanqueAux,
        ubicacionTanqueAux,
        volumenActualTanqueAux,
        volumenCapacidadTanqueAux,
        tipoCargaTanqueAux,
        embarcacion,
        tanqueAuxCreado,
        tanqueAuxModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateTanqueAux,
      message: 'TanqueAux Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

tanqueAuxCtrl.deleteTanqueAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await TanqueAux.findByIdAndDelete(id)
    res.status(200).json({
      message: 'TanqueAux Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = tanqueAuxCtrl

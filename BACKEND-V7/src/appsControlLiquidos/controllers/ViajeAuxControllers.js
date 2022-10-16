const viajeAuxCtrl = {}

const ViajeAux = require('../models/ViajeAuxModels')

viajeAuxCtrl.createViajeAux = async (req, res) => {
  const {
    descripcionViajeAux,
    paisViajeAux,
    estatusViajeAux,
    fechaArriboViajeAux,
    fechaZarpeViajeAux,
    viaje,
    viajeAuxCreado,
    viajeAuxModificado
  } = req.body
  try {
    const newViajeAux = new ViajeAux({
      descripcionViajeAux,
      paisViajeAux,
      estatusViajeAux,
      fechaArriboViajeAux,
      fechaZarpeViajeAux,
      viaje,
      viajeAuxCreado,
      viajeAuxModificado
    })
    const saveViajeAux = await newViajeAux.save()

    res.status(200).json({
      saveViajeAux,
      message: 'Nuevo ViajeAux Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

viajeAuxCtrl.getViajeAuxs = async (req, res) => {
  try {
    const viajeAux = await ViajeAux.find({}).populate('viaje')
    res.status(200).json(viajeAux)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

viajeAuxCtrl.getViajeAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const viajeAux = await ViajeAux.findById(id)
    if (viajeAux) {
      res.status(200).json(viajeAux)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

viajeAuxCtrl.updateViajeAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    descripcionViajeAux,
    paisViajeAux,
    estatusViajeAux,
    fechaArriboViajeAux,
    fechaZarpeViajeAux,
    viaje,
    viajeAuxCreado,
    viajeAuxModificado
  } = req.body

  try {
    const updateViajeAux = await ViajeAux.findByIdAndUpdate(
      id,
      {
        descripcionViajeAux,
        paisViajeAux,
        estatusViajeAux,
        fechaArriboViajeAux,
        fechaZarpeViajeAux,
        viaje,
        viajeAuxCreado,
        viajeAuxModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateViajeAux,
      message: 'ViajeAux Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

viajeAuxCtrl.deleteViajeAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await ViajeAux.findByIdAndDelete(id)
    res.status(200).json({
      message: 'ViajeAux Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = viajeAuxCtrl

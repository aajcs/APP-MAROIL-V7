const viajeCtrl = {}

const GastosOperacionale = require('../../appsControlLiquidos/models/GastosOperacionaleModels')

viajeCtrl.createGastosOperacionale = async (req, res) => {
  const {
    nombreGastosOperacionale,
    descripcionGastosOperacionale,
    montoGastosOperacionale,
    fechaGastosOperacionale,
    estatusGastosOperacionale,
    embarcacion,
    remolcador,
    viaje,
    gastosOperacionaleCreado,
    gastosOperacionaleModificado
  } = req.body
  try {
    const newGastosOperacionale = new GastosOperacionale({
      nombreGastosOperacionale,
      descripcionGastosOperacionale,
      montoGastosOperacionale,
      fechaGastosOperacionale,
      estatusGastosOperacionale,
      embarcacion,
      remolcador,
      viaje,
      gastosOperacionaleCreado,
      gastosOperacionaleModificado
    })
    const saveGastosOperacionale = await newGastosOperacionale.save()

    res.status(200).json({
      saveGastosOperacionale,
      message: 'Nuevo GastosOperacionale Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

viajeCtrl.getGastosOperacionales = async (req, res) => {
  try {
    const viaje = await GastosOperacionale.find({})
      .populate('embarcacion')
      .populate('remolcador')
      .populate('viaje')
    res.status(200).json(viaje)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

viajeCtrl.getGastosOperacionale = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const viaje = await GastosOperacionale.findById(id)
    if (viaje) {
      res.status(200).json(viaje)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

viajeCtrl.updateGastosOperacionale = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    nombreGastosOperacionale,
    descripcionGastosOperacionale,
    montoGastosOperacionale,
    fechaGastosOperacionale,
    estatusGastosOperacionale,
    embarcacion,
    remolcador,
    viaje,
    gastosOperacionaleCreado,
    gastosOperacionaleModificado
  } = req.body

  try {
    const updateGastosOperacionale = await GastosOperacionale.findByIdAndUpdate(
      id,
      {
        nombreGastosOperacionale,
        descripcionGastosOperacionale,
        montoGastosOperacionale,
        fechaGastosOperacionale,
        estatusGastosOperacionale,
        embarcacion,
        remolcador,
        viaje,
        gastosOperacionaleCreado,
        gastosOperacionaleModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateGastosOperacionale,
      message: 'GastosOperacionale Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

viajeCtrl.deleteGastosOperacionale = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await GastosOperacionale.findByIdAndDelete(id)
    res.status(200).json({
      message: 'GastosOperacionale Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = viajeCtrl

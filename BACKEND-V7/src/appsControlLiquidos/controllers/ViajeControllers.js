const viajeCtrl = {}

const Viaje = require('../../appsControlLiquidos/models/ViajeModels')

viajeCtrl.createViaje = async (req, res) => {
  const {
    nombreViaje,
    descripcionViaje,
    estatusViaje,
    destinoViaje,
    fechaInicioViaje,
    fechaFinViaje,
    embarcacion,
    remolcador,
    viajeCreado,
    viajeModificado
  } = req.body
  try {
    const newViaje = new Viaje({
      nombreViaje,
      descripcionViaje,
      estatusViaje,
      destinoViaje,
      fechaInicioViaje,
      fechaFinViaje,
      embarcacion,
      remolcador,
      viajeCreado,
      viajeModificado
    })
    const saveViaje = await newViaje.save()

    res.status(200).json({
      saveViaje,
      message: 'Nuevo Viaje Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

viajeCtrl.getViajes = async (req, res) => {
  try {
    const viaje = await Viaje.find({})
      .populate('embarcacion')
      .populate('remolcador')
    res.status(200).json(viaje)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

viajeCtrl.getViaje = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const viaje = await Viaje.findById(id)
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

viajeCtrl.updateViaje = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    nombreViaje,
    descripcionViaje,
    estatusViaje,
    destinoViaje,
    fechaInicioViaje,
    fechaFinViaje,
    embarcacion,
    remolcador,
    viajeCreado,
    viajeModificado
  } = req.body

  try {
    const updateViaje = await Viaje.findByIdAndUpdate(
      id,
      {
        nombreViaje,
        descripcionViaje,
        estatusViaje,
        destinoViaje,
        fechaInicioViaje,
        fechaFinViaje,
        embarcacion,
        remolcador,
        viajeCreado,
        viajeModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateViaje,
      message: 'Viaje Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

viajeCtrl.deleteViaje = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Viaje.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Viaje Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = viajeCtrl

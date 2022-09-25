const embarcacionCtrl = {}

const Remolcador = require('../../appsControlLiquidos/models/RemolcadorModels')

embarcacionCtrl.createRemolcador = async (req, res) => {
  const {
    nombreRemolcador,
    descripcionRemolcador,
    estatusRemolcador,
    ubicacionRemolcador,
    combustibleActualRemolcador,
    combustibleCapacidadRemolcador,
    embarcacionCreado,
    embarcacionModificado
  } = req.body
  try {
    const newRemolcador = new Remolcador({
      nombreRemolcador,
      descripcionRemolcador,
      estatusRemolcador,
      ubicacionRemolcador,
      combustibleActualRemolcador,
      combustibleCapacidadRemolcador,
      embarcacionCreado,
      embarcacionModificado
    })
    const saveRemolcador = await newRemolcador.save()

    res.status(200).json({
      saveRemolcador,
      message: 'Nuevo Remolcador Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

embarcacionCtrl.getRemolcadors = async (req, res) => {
  try {
    const embarcacion = await Remolcador.find({})
    res.status(200).json(embarcacion)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

embarcacionCtrl.getRemolcador = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const embarcacion = await Remolcador.findById(id)
    if (embarcacion) {
      res.status(200).json(embarcacion)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

embarcacionCtrl.updateRemolcador = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    nombreRemolcador,
    descripcionRemolcador,
    estatusRemolcador,
    ubicacionRemolcador,
    combustibleActualRemolcador,
    combustibleCapacidadRemolcador,
    embarcacionCreado,
    embarcacionModificado
  } = req.body

  try {
    const updateRemolcador = await Remolcador.findByIdAndUpdate(
      id,
      {
        nombreRemolcador,
        descripcionRemolcador,
        estatusRemolcador,
        ubicacionRemolcador,
        combustibleActualRemolcador,
        combustibleCapacidadRemolcador,
        embarcacionCreado,
        embarcacionModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateRemolcador,
      message: 'Remolcador Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

embarcacionCtrl.deleteRemolcador = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Remolcador.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Remolcador Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = embarcacionCtrl

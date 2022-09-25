const remolcadorCtrl = {}

const Embarcacion = require('../../appsControlLiquidos/models/EmbarcacionModels')

remolcadorCtrl.createEmbarcacion = async (req, res) => {
  const {
    nombreEmbarcacion,
    descripcionEmbarcacion,
    estatusEmbarcacion,
    ubicacionEmbarcacion,
    combustibleActualEmbarcacion,
    combustibleCapacidadEmbarcacion,
    remolcadorCreado,
    remolcadorModificado
  } = req.body
  try {
    const newEmbarcacion = new Embarcacion({
      nombreEmbarcacion,
      descripcionEmbarcacion,
      estatusEmbarcacion,
      ubicacionEmbarcacion,
      combustibleActualEmbarcacion,
      combustibleCapacidadEmbarcacion,
      remolcadorCreado,
      remolcadorModificado
    })
    const saveEmbarcacion = await newEmbarcacion.save()

    res.status(200).json({
      saveEmbarcacion,
      message: 'Nuevo Embarcacion Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

remolcadorCtrl.getEmbarcacions = async (req, res) => {
  try {
    const remolcador = await Embarcacion.find({})
    res.status(200).json(remolcador)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

remolcadorCtrl.getEmbarcacion = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const remolcador = await Embarcacion.findById(id)
    if (remolcador) {
      res.status(200).json(remolcador)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

remolcadorCtrl.updateEmbarcacion = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    nombreEmbarcacion,
    descripcionEmbarcacion,
    estatusEmbarcacion,
    ubicacionEmbarcacion,
    combustibleActualEmbarcacion,
    combustibleCapacidadEmbarcacion,
    remolcadorCreado,
    remolcadorModificado
  } = req.body

  try {
    const updateEmbarcacion = await Embarcacion.findByIdAndUpdate(
      id,
      {
        nombreEmbarcacion,
        descripcionEmbarcacion,
        estatusEmbarcacion,
        ubicacionEmbarcacion,
        combustibleActualEmbarcacion,
        combustibleCapacidadEmbarcacion,
        remolcadorCreado,
        remolcadorModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateEmbarcacion,
      message: 'Embarcacion Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

remolcadorCtrl.deleteEmbarcacion = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Embarcacion.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Embarcacion Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = remolcadorCtrl

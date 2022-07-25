const activoCtrl = {}

const Activo = require('../models/ActivoModels')

activoCtrl.createActivo = async (req, res) => {
  const {
    codigoActivo,
    nombreActivo,
    descripcionActivo,
    areaActivo,
    tipoActivo,
    modeloActivo,
    serialActivo,
    estatusActivo,
    userCreatorId,
    activoCreado,
    activoModificado
  } = req.body
  try {
    const newActivo = new Activo({
      codigoActivo,
      nombreActivo,
      descripcionActivo,
      areaActivo,
      tipoActivo,
      modeloActivo,
      serialActivo,
      estatusActivo,
      userCreatorId,
      activoCreado,
      activoModificado
    })
    const saveActivo = await newActivo.save()

    res.status(200).json({
      saveActivo,
      message: 'Nuevo Activo Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

activoCtrl.getActivos = async (req, res) => {
  try {
    const activo = await Activo.find({})
    res.status(200).json(activo)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

activoCtrl.getActivo = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const activo = await Activo.findById(id)
    if (activo) {
      res.status(200).json(activo)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

activoCtrl.updateActivo = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    codigoActivo,
    nombreActivo,
    descripcionActivo,
    areaActivo,
    tipoActivo,
    modeloActivo,
    serialActivo,
    estatusActivo,
    userCreatorId,
    activoCreado,
    activoModificado
  } = req.body

  try {
    const updateActivo = await Activo.findByIdAndUpdate(
      id,
      {
        codigoActivo,
        nombreActivo,
        descripcionActivo,
        areaActivo,
        tipoActivo,
        modeloActivo,
        serialActivo,
        estatusActivo,
        userCreatorId,
        activoCreado,
        activoModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateActivo,
      message: 'Activo Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

activoCtrl.deleteActivo = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Activo.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Activo Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = activoCtrl

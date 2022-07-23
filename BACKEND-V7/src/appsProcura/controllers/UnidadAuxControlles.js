const unidadAuxCtrl = {}

const UnidadAux = require('../models/UnidadAuxModels')

unidadAuxCtrl.createUnidadAux = async (req, res) => {
  const {
    nombreProyecto,
    descripcionProyecto,
    estatusProyecto,
    unidadAuxCreado,
    unidadAuxModificado
  } = req.body
  try {
    const newUnidadAux = new UnidadAux({
      nombreProyecto,
      descripcionProyecto,
      estatusProyecto,
      unidadAuxCreado,
      unidadAuxModificado
    })
    const saveUnidadAux = await newUnidadAux.save()

    res.status(200).json({
      saveUnidadAux,
      message: 'Nuevo UnidadAux Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

unidadAuxCtrl.getUnidadAuxs = async (req, res) => {
  try {
    const unidadAux = await UnidadAux.find({})
    res.status(200).json(unidadAux)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

unidadAuxCtrl.getUnidadAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const unidadAux = await UnidadAux.findById(id)
    if (unidadAux) {
      res.status(200).json(unidadAux)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

unidadAuxCtrl.updateUnidadAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    nombreProyecto,
    descripcionProyecto,
    estatusProyecto,
    unidadAuxCreado,
    unidadAuxModificado
  } = req.body

  try {
    const updategabarra = await UnidadAux.findByIdAndUpdate(
      id,
      {
        nombreProyecto,
        descripcionProyecto,
        estatusProyecto,
        unidadAuxCreado,
        unidadAuxModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updategabarra,
      message: 'UnidadAux Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

unidadAuxCtrl.deleteUnidadAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await UnidadAux.findByIdAndDelete(id)
    res.status(200).json({
      message: 'UnidadAux Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = unidadAuxCtrl

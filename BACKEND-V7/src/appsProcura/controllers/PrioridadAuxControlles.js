const prioridadAux = {}

const PrioridadAux = require('../models/PrioridadAuxModels')

prioridadAux.createPrioridadAux = async (req, res) => {
  const {
    nombreProyecto,
    descripcionProyecto,
    estatusProyecto,
    proyectoAuxCreado,
    proyectoAuxModificado
  } = req.body
  try {
    const newPrioridadAux = new PrioridadAux({
      nombreProyecto,
      descripcionProyecto,
      estatusProyecto,
      proyectoAuxCreado,
      proyectoAuxModificado
    })
    const savePrioridadAux = await newPrioridadAux.save()

    res.status(200).json({
      savePrioridadAux,
      message: 'Nuevo PrioridadAux Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

prioridadAux.getPrioridadAuxs = async (req, res) => {
  try {
    const proyectoAux = await PrioridadAux.find({})
    res.status(200).json(proyectoAux)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

prioridadAux.getPrioridadAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const proyectoAux = await PrioridadAux.findById(id)
    if (proyectoAux) {
      res.status(200).json(proyectoAux)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

prioridadAux.updatePrioridadAux = async (req, res) => {
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
    proyectoAuxCreado,
    proyectoAuxModificado
  } = req.body

  try {
    const updategabarra = await PrioridadAux.findByIdAndUpdate(
      id,
      {
        nombreProyecto,
        descripcionProyecto,
        estatusProyecto,
        proyectoAuxCreado,
        proyectoAuxModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updategabarra,
      message: 'PrioridadAux Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

prioridadAux.deletePrioridadAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await PrioridadAux.findByIdAndDelete(id)
    res.status(200).json({
      message: 'PrioridadAux Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = prioridadAux

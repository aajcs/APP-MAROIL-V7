const ganadorCtrl = {}

const Ganador = require('../models/GanadorModels')

ganadorCtrl.createGanador = async (req, res) => {
  const { nombreGanador, estatusGanador } = req.body
  try {
    const newGanador = new Ganador({
      nombreGanador,
      estatusGanador
    })
    const saveGanador = await newGanador.save()

    res.status(200).json({
      saveGanador,
      message: 'Nuevo Ganador Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

ganadorCtrl.getGanadors = async (req, res) => {
  try {
    const ganador = await Ganador.find({})
    res.status(200).json(ganador)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

ganadorCtrl.getGanador = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const ganador = await Ganador.findById(id)
    if (ganador) {
      res.status(200).json(ganador)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

ganadorCtrl.updateGanador = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const { nombreGanador, estatusGanador } = req.body

  try {
    const updategabarra = await Ganador.findByIdAndUpdate(
      id,
      {
        nombreGanador,
        estatusGanador
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updategabarra,
      message: 'Ganador Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

ganadorCtrl.deleteGanador = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Ganador.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Ganador Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = ganadorCtrl

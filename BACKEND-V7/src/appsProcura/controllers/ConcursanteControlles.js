const concursanteCtrl = {}

const Concursante = require('../models/ConcursanteModels')

concursanteCtrl.createConcursante = async (req, res) => {
  const { nombreConcursante, estatusConcursante } = req.body
  try {
    const newConcursante = new Concursante({
      nombreConcursante,
      estatusConcursante
    })
    const saveConcursante = await newConcursante.save()

    res.status(200).json({
      saveConcursante,
      message: 'Nuevo Concursante Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

concursanteCtrl.getConcursantes = async (req, res) => {
  try {
    const concursante = await Concursante.find({})
    res.status(200).json(concursante)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

concursanteCtrl.getConcursante = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const concursante = await Concursante.findById(id)
    if (concursante) {
      res.status(200).json(concursante)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

concursanteCtrl.updateConcursante = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const { nombreConcursante, estatusConcursante } = req.body

  try {
    const updategabarra = await Concursante.findByIdAndUpdate(
      id,
      {
        nombreConcursante,
        estatusConcursante
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updategabarra,
      message: 'Concursante Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

concursanteCtrl.deleteConcursante = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Concursante.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Concursante Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = concursanteCtrl

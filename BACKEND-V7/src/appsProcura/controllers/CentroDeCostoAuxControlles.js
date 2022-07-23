const centroDeCostoAuxCtrl = {}

const CentroDeCostoAux = require('../models/CentroDeCostoAuxModels')

centroDeCostoAuxCtrl.createCentroDeCostoAux = async (req, res) => {
  const {
    nombreProyecto,
    descripcionProyecto,
    estatusProyecto,
    centroDeCostoAuxCreado,
    centroDeCostoAuxModificado
  } = req.body
  try {
    const newCentroDeCostoAux = new CentroDeCostoAux({
      nombreProyecto,
      descripcionProyecto,
      estatusProyecto,
      centroDeCostoAuxCreado,
      centroDeCostoAuxModificado
    })
    const saveCentroDeCostoAux = await newCentroDeCostoAux.save()

    res.status(200).json({
      saveCentroDeCostoAux,
      message: 'Nuevo CentroDeCostoAux Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

centroDeCostoAuxCtrl.getCentroDeCostoAuxs = async (req, res) => {
  try {
    const centroDeCostoAux = await CentroDeCostoAux.find({})
    res.status(200).json(centroDeCostoAux)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

centroDeCostoAuxCtrl.getCentroDeCostoAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const centroDeCostoAux = await CentroDeCostoAux.findById(id)
    if (centroDeCostoAux) {
      res.status(200).json(centroDeCostoAux)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

centroDeCostoAuxCtrl.updateCentroDeCostoAux = async (req, res) => {
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
    centroDeCostoAuxCreado,
    centroDeCostoAuxModificado
  } = req.body

  try {
    const updategabarra = await CentroDeCostoAux.findByIdAndUpdate(
      id,
      {
        nombreProyecto,
        descripcionProyecto,
        estatusProyecto,
        centroDeCostoAuxCreado,
        centroDeCostoAuxModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updategabarra,
      message: 'CentroDeCostoAux Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

centroDeCostoAuxCtrl.deleteCentroDeCostoAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await CentroDeCostoAux.findByIdAndDelete(id)
    res.status(200).json({
      message: 'CentroDeCostoAux Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = centroDeCostoAuxCtrl

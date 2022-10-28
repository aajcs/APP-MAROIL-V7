const costoTmMesCtrl = {}

const CostoTmMes = require('../models/CostoTmMesModels')

costoTmMesCtrl.createCostoTmMes = async (req, res) => {
  const {
    codigoCostoTmMes,
    nombreCostoTmMes,
    costoCostoTmMes,
    fechaEfectivaCostoTmMes,
    estatusCostoTmMes,
    creadoCostoTmMes,
    modifiCadocostoTmMes
  } = req.body
  try {
    const newCostoTmMes = new CostoTmMes({
      codigoCostoTmMes,
      nombreCostoTmMes,
      costoCostoTmMes,
      fechaEfectivaCostoTmMes,
      estatusCostoTmMes,
      creadoCostoTmMes,
      modifiCadocostoTmMes
    })
    const saveCostoTmMes = await newCostoTmMes.save()

    res.status(200).json({
      saveCostoTmMes,
      message: 'Nuevo CostoTmMes Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

costoTmMesCtrl.getCostoTmMess = async (req, res) => {
  try {
    const costoTmMes = await CostoTmMes.find({})
    res.status(200).json(costoTmMes)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

costoTmMesCtrl.getCostoTmMes = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const costoTmMes = await CostoTmMes.findById(id)
    if (costoTmMes) {
      res.status(200).json(costoTmMes)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

costoTmMesCtrl.updateCostoTmMes = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    codigoCostoTmMes,
    nombreCostoTmMes,
    costoCostoTmMes,
    fechaEfectivaCostoTmMes,
    estatusCostoTmMes,
    creadoCostoTmMes,
    modifiCadocostoTmMes
  } = req.body

  try {
    const updateCostoTmMes = await CostoTmMes.findByIdAndUpdate(
      id,
      {
        codigoCostoTmMes,
        nombreCostoTmMes,
        costoCostoTmMes,
        fechaEfectivaCostoTmMes,
        estatusCostoTmMes,
        creadoCostoTmMes,
        modifiCadocostoTmMes
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    console.log(updateCostoTmMes)
    res.status(200).json({
      updateCostoTmMes,
      message: 'CostoTmMes Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

costoTmMesCtrl.deleteCostoTmMes = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await CostoTmMes.findByIdAndDelete(id)
    res.status(200).json({
      message: 'CostoTmMes Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = costoTmMesCtrl

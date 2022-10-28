const MensualidadOpMeCtrl = {}

const MensualidadOpMes = require('../models/MensualidadOpMesModels')

MensualidadOpMeCtrl.createMensualidadOpMes = async (req, res) => {
  const {
    codigoMensualidadOpMes,
    nombreMensualidadOpMes,
    costoMensualidadOpMes,
    fechaEfectivaMensualidadOpMes,
    estatusMensualidadOpMes,
    creadoMensualidadOpMes,
    modifiCadocostoTmMes
  } = req.body
  try {
    const newMensualidadOpMes = new MensualidadOpMes({
      codigoMensualidadOpMes,
      nombreMensualidadOpMes,
      costoMensualidadOpMes,
      fechaEfectivaMensualidadOpMes,
      estatusMensualidadOpMes,
      creadoMensualidadOpMes,
      modifiCadocostoTmMes
    })
    const saveMensualidadOpMes = await newMensualidadOpMes.save()

    res.status(200).json({
      saveMensualidadOpMes,
      message: 'Nuevo MensualidadOpMes Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

MensualidadOpMeCtrl.getMensualidadOpMess = async (req, res) => {
  try {
    const costoTmMes = await MensualidadOpMes.find({})
    res.status(200).json(costoTmMes)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

MensualidadOpMeCtrl.getMensualidadOpMes = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const costoTmMes = await MensualidadOpMes.findById(id)
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

MensualidadOpMeCtrl.updateMensualidadOpMes = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    codigoMensualidadOpMes,
    nombreMensualidadOpMes,
    costoMensualidadOpMes,
    fechaEfectivaMensualidadOpMes,
    estatusMensualidadOpMes,
    creadoMensualidadOpMes,
    modifiCadocostoTmMes
  } = req.body

  try {
    const updateMensualidadOpMes = await MensualidadOpMes.findByIdAndUpdate(
      id,
      {
        codigoMensualidadOpMes,
        nombreMensualidadOpMes,
        costoMensualidadOpMes,
        fechaEfectivaMensualidadOpMes,
        estatusMensualidadOpMes,
        creadoMensualidadOpMes,
        modifiCadocostoTmMes
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    console.log(updateMensualidadOpMes)
    res.status(200).json({
      updateMensualidadOpMes,
      message: 'MensualidadOpMes Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

MensualidadOpMeCtrl.deleteMensualidadOpMes = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await MensualidadOpMes.findByIdAndDelete(id)
    res.status(200).json({
      message: 'MensualidadOpMes Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = MensualidadOpMeCtrl

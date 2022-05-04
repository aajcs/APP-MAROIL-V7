const programacionVentanaCtrl = {}

const ProgramacionVentana = require('../models/ProgramacionVentanaModels')

programacionVentanaCtrl.createProgramacionVentana = async (req, res) => {
  const {
    nombreBuque,
    descripcion,
    terminalBuque,
    buqueCliente,
    buquePaisDestino,
    toneladasNominadas,
    fechaInicioVentana,
    fechaFinVentana,
    programacionVentanaCreado,
    programacionVentanaModificado
  } = req.body
  try {
    const newProgramacionVentana = new ProgramacionVentana({
      nombreBuque,
      descripcion,
      terminalBuque,
      buqueCliente,
      buquePaisDestino,
      toneladasNominadas,
      fechaInicioVentana,
      fechaFinVentana,
      programacionVentanaCreado,
      programacionVentanaModificado
    })
    const saveProgramacionVentana = await newProgramacionVentana.save()

    res.status(200).json({
      saveProgramacionVentana,
      message: 'Nuevo ProgramacionVentana Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

programacionVentanaCtrl.getProgramacionVentanas = async (req, res) => {
  try {
    const programacionVentanas = await ProgramacionVentana.find({})

    res.status(200).json(programacionVentanas)
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

programacionVentanaCtrl.getProgramacionVentana = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const programacionVentana = await ProgramacionVentana.findById(id)
    if (programacionVentana) {
      res.status(200).json(programacionVentana)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

programacionVentanaCtrl.updateProgramacionVentana = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    nombreBuque,
    descripcion,
    terminalBuque,
    buqueCliente,
    buquePaisDestino,
    toneladasNominadas,
    fechaInicioVentana,
    fechaFinVentana,
    programacionVentanaCreado,
    programacionVentanaModificado
  } = req.body

  try {
    const updateProgramacionVentana =
      await ProgramacionVentana.findByIdAndUpdate(
        id,
        {
          nombreBuque,
          descripcion,
          terminalBuque,
          buqueCliente,
          buquePaisDestino,
          toneladasNominadas,
          fechaInicioVentana,
          fechaFinVentana,
          programacionVentanaCreado,
          programacionVentanaModificado
        },
        { new: true }
      )
    res.status(200).json({
      updateProgramacionVentana,
      message: 'ProgramacionVentana Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

programacionVentanaCtrl.deleteProgramacionVentana = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await ProgramacionVentana.findByIdAndDelete(id)
    res.status(200).json({
      message: 'ProgramacionVentana Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = programacionVentanaCtrl

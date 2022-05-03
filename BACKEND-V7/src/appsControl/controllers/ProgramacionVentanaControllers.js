const programacionVentanaCtrl = {}

const ProgramacionVentana = require('../models/ProgramacionVentanaModels')

programacionVentanaCtrl.createProgramacionVentana = async (req, res) => {
  const {
    nombreBuque,
    descripcion,
    buqueCliente,
    buquePaisDestino,
    toneladasNominadas,
    fechaInicioVentana,
    fechaFinVentana,
    buqueCreado,
    buqueModificado
  } = req.body
  try {
    const newProgramacionVentana = new ProgramacionVentana({
      nombreBuque,
      descripcion,
      buqueCliente,
      buquePaisDestino,
      toneladasNominadas,
      fechaInicioVentana,
      fechaFinVentana,
      buqueCreado,
      buqueModificado
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
      .populate('reporteCarga')
      .populate('reporteCargaGOM')
      .populate('cargaBodega')
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
    const programacionVentana = await ProgramacionVentana.findById(id).populate(
      'reporteCarga'
    )
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
    buqueCliente,
    buquePaisDestino,
    toneladasNominadas,
    fechaInicioVentana,
    fechaFinVentana,
    buqueCreado,
    buqueModificado
  } = req.body
  // no se esta usuando
  // const newProgramacionVentana = new ProgramacionVentana({
  //   nombreProgramacionVentana,
  //   descripcion,
  //   toneladasCapacidad,
  //   toneladasNominadas,
  //   toneladasActual,
  //   totalGabarras,
  //   cantidadBodegas,
  //   cantidadGruas,
  //   estatusProgramacionVentana,
  //   reporteCarga,
  //   programacionVentanaCreado,
  //   programacionVentanaModificado
  // })

  try {
    const updateProgramacionVentana =
      await ProgramacionVentana.findByIdAndUpdate(
        id,
        {
          nombreBuque,
          descripcion,
          buqueCliente,
          buquePaisDestino,
          toneladasNominadas,
          fechaInicioVentana,
          fechaFinVentana,
          buqueCreado,
          buqueModificado
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

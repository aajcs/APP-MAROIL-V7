const barcoCtrl = {}

const Barco = require('../models/BarcoModels')

barcoCtrl.createBarco = async (req, res) => {
  const {
    nombreBarco,
    descripcion,
    buqueCliente,
    buquePaisDestino,
    toneladasCapacidad,
    toneladasNominadas,
    toneladasActual,
    totalGabarras,
    cantidadBodegas,
    cantidadGruas,
    fechaAtraco,
    fechaInicioCarga,
    fechaFinalCarga,
    estatusBarco,
    reporteCarga,
    reporteCargaGOM,
    barcoCreado,
    barcoModificado
  } = req.body
  try {
    const newBarco = new Barco({
      nombreBarco,
      descripcion,
      buqueCliente,
      buquePaisDestino,
      toneladasCapacidad,
      toneladasNominadas,
      toneladasActual,
      totalGabarras,
      cantidadBodegas,
      cantidadGruas,
      fechaAtraco,
      fechaInicioCarga,
      fechaFinalCarga,
      estatusBarco,
      reporteCarga,
      reporteCargaGOM,
      barcoCreado,
      barcoModificado
    })
    const saveBarco = await newBarco.save()

    res.status(200).json({
      saveBarco,
      message: 'Nuevo Barco Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

barcoCtrl.getBarcos = async (req, res) => {
  try {
    const barcos = await Barco.find({})
      .populate('reporteCarga')
      .populate('reporteCargaGOM')
      .populate('cargaBodega')
    res.status(200).json(barcos)
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

barcoCtrl.getBarco = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const barco = await Barco.findById(id).populate('reporteCarga')
    if (barco) {
      res.status(200).json(barco)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

barcoCtrl.updateBarco = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    nombreBarco,
    descripcion,
    buqueCliente,
    buquePaisDestino,
    toneladasCapacidad,
    toneladasNominadas,
    toneladasActual,
    totalGabarras,
    cantidadBodegas,
    cantidadGruas,
    fechaAtraco,
    fechaInicioCarga,
    fechaFinalCarga,
    estatusBarco,
    barcoCreado,
    barcoModificado
  } = req.body
  // no se esta usuando
  // const newBarco = new Barco({
  //   nombreBarco,
  //   descripcion,
  //   toneladasCapacidad,
  //   toneladasNominadas,
  //   toneladasActual,
  //   totalGabarras,
  //   cantidadBodegas,
  //   cantidadGruas,
  //   estatusBarco,
  //   reporteCarga,
  //   barcoCreado,
  //   barcoModificado
  // })

  try {
    const updateBarco = await Barco.findByIdAndUpdate(
      id,
      {
        nombreBarco,
        descripcion,
        buqueCliente,
        buquePaisDestino,
        toneladasCapacidad,
        toneladasNominadas,
        toneladasActual,
        totalGabarras,
        cantidadBodegas,
        cantidadGruas,
        fechaAtraco,
        fechaInicioCarga,
        fechaFinalCarga,
        estatusBarco,
        barcoCreado,
        barcoModificado
      },
      { new: true }
    )
    res.status(200).json({
      updateBarco,
      message: 'Barco Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

barcoCtrl.deleteBarco = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Barco.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Barco Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = barcoCtrl

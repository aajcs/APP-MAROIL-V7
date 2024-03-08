const buqueCtrl = {}

const Buque = require('../models/BuqueModels')

buqueCtrl.createBuque = async (req, res) => {
  const {
    nombreBuque,
    descripcionBuque,
    clienteBuque,
    clienteVentaBuque,
    paisDestinoBuque,
    capacidadBuque,
    capacidadNominadaBuque,
    capacidadActualBuque,
    blFinalBuque,
    totalGabarras,
    cantidadBodegas,
    tiempoDemora,
    costoDemora,
    cantidadGruasBuque,
    fechaAtracoBuque,
    fechaInicioCargaBuque,
    fechaFinalCargaBuque,
    estatusBuque,
    reporteCargaBuque,
    reporteCargaGOMBuque,
    cargaBodegaBuque,
    volumetriaIdBuque
  } = req.body
  try {
    const newBuque = new Buque({
      nombreBuque,
      descripcionBuque,
      clienteBuque,
      clienteVentaBuque,
      paisDestinoBuque,
      capacidadBuque,
      capacidadNominadaBuque,
      capacidadActualBuque,
      blFinalBuque,
      totalGabarras,
      cantidadBodegas,
      tiempoDemora,
      costoDemora,
      cantidadGruasBuque,
      fechaAtracoBuque,
      fechaInicioCargaBuque,
      fechaFinalCargaBuque,
      estatusBuque,
      reporteCargaBuque,
      reporteCargaGOMBuque,
      cargaBodegaBuque,
      volumetriaIdBuque
    })
    const saveBuque = await newBuque.save()

    res.status(200).json({
      saveBuque,
      message: 'Nuevo Buque Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

buqueCtrl.getBuques = async (req, res) => {
  try {
    const barcos = await Buque.find({})
    // .populate('reporteCarga')
    // .populate('reporteCargaGOM')
    // .populate('cargaBodega')
    // .populate('volumetriaId')
    res.status(200).json(barcos)
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

buqueCtrl.getBuque = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const barco = await Buque.findById(id).populate('reporteCarga')
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

buqueCtrl.updateBuque = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    nombreBuque,
    descripcionBuque,
    clienteBuque,
    clienteVentaBuque,
    paisDestinoBuque,
    capacidadBuque,
    capacidadNominadaBuque,
    capacidadActualBuque,
    blFinalBuque,
    totalGabarras,
    cantidadBodegas,
    tiempoDemora,
    costoDemora,
    cantidadGruasBuque,
    fechaAtracoBuque,
    fechaInicioCargaBuque,
    fechaFinalCargaBuque,
    estatusBuque,
    reporteCargaBuque,
    reporteCargaGOMBuque,
    cargaBodegaBuque,
    volumetriaIdBuque
  } = req.body
  // no se esta usuando
  // const newBuque = new Buque({
  //   nombreBuque,
  //   descripcion,
  //   toneladasCapacidad,
  //   toneladasNominadas,
  //   toneladasActual,
  //   totalGabarras,
  //   cantidadBodegas,
  //   cantidadGruas,
  //   estatusBuque,
  //   reporteCarga,
  //   barcoCreado,
  //   barcoModificado
  // })

  try {
    const updateBuque = await Buque.findByIdAndUpdate(
      id,
      {
        nombreBuque,
        descripcionBuque,
        clienteBuque,
        clienteVentaBuque,
        paisDestinoBuque,
        capacidadBuque,
        capacidadNominadaBuque,
        capacidadActualBuque,
        blFinalBuque,
        totalGabarras,
        cantidadBodegas,
        tiempoDemora,
        costoDemora,
        cantidadGruasBuque,
        fechaAtracoBuque,
        fechaInicioCargaBuque,
        fechaFinalCargaBuque,
        estatusBuque,
        reporteCargaBuque,
        reporteCargaGOMBuque,
        cargaBodegaBuque,
        volumetriaIdBuque
      },
      { new: true }
    )
    res.status(200).json({
      updateBuque,
      message: 'Buque Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

buqueCtrl.deleteBuque = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Buque.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Buque Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = buqueCtrl

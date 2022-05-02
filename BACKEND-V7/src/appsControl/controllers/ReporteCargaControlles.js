const reporteCargaCtrl = {}

const Barco = require('../models/BarcoModels')
const Gabarra = require('../models/GabarraModels')
const ReporteCarga = require('../models/ReporteCargaModels')

reporteCargaCtrl.createReporteCarga = async (req, res) => {
  const {
    barcoID,
    gabarraID,
    trenCargados,
    trenTotales,
    toneladasCargadas,
    toneladasRemanente,
    toneladasTotales,
    reporteCargaCreado,
    reporteCargaModificado
  } = req.body
  const gabarraFindID = await Gabarra.findById(gabarraID)
  const barcoFindID = await Barco.findById(barcoID)
  if (!barcoFindID || !gabarraFindID) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const newReporteCarga = new ReporteCarga({
    barcoID: barcoFindID._id,
    gabarraID: gabarraFindID._id,
    trenCargados,
    trenTotales,
    toneladasCargadas,
    toneladasRemanente,
    toneladasTotales,
    reporteCargaCreado,
    reporteCargaModificado
  })
  try {
    const savenewReporteCarga = await newReporteCarga.save()

    barcoFindID.reporteCarga = barcoFindID.reporteCarga.concat(
      savenewReporteCarga._id
    )
    await barcoFindID.save()

    res.status(200).json({
      savenewReporteCarga,
      message: 'Nuevo ReporteCarga Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

reporteCargaCtrl.getReporteCargas = async (req, res) => {
  try {
    const reporteCargas = await ReporteCarga.find({})
      .populate('barcoID')
      .populate('gabarraID')
    res.status(200).json(reporteCargas)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

reporteCargaCtrl.getReporteCarga = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const reporteCarga = await ReporteCarga.findById(id).populate('barcoID', {
      nombre: 1
    })
    if (reporteCarga) {
      res.status(200).json(reporteCarga)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

reporteCargaCtrl.updateReporteCarga = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    barcoID,
    gabarraID,
    trenCargados,
    trenTotales,
    toneladasCargadas,
    toneladasRemanente,
    toneladasTotales,
    reporteCargaCreado,
    reporteCargaModificado
  } = req.body

  try {
    const updateReporteCarga = await ReporteCarga.findByIdAndUpdate(
      id,
      {
        barcoID,
        gabarraID,
        trenCargados,
        trenTotales,
        toneladasCargadas,
        toneladasRemanente,
        toneladasTotales,
        reporteCargaCreado,
        reporteCargaModificado
      },
      { new: true }
    )

    res.status(200).json({
      updateReporteCarga,
      message: 'ReporteCarga Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

reporteCargaCtrl.deleteReporteCarga = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await ReporteCarga.findByIdAndDelete(id)
    res.status(200).json({
      message: 'ReporteCarga Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = reporteCargaCtrl

const reporteCargaGOMCtrl = {}

const Barco = require('../models/BarcoModels')
const ReporteCargaGOM = require('../models/ReporteCargaGOMModels')

reporteCargaGOMCtrl.createReporteCargaGOM = async (req, res) => {
  const {
    barcoID,
    ubicacionBuque,
    puestoTerminal,
    fechaAtraco,
    fechaInicioCarga,
    fechaFinalCarga,
    toneladasCargadasGOM,
    tasaDeCargaGOM,
    etc,
    comentariosGOM,
    observacionesGOM,
    reporteCargaGOMCreado,
    reporteCargaGOMModificado
  } = req.body

  const barcoFindID = await Barco.findById(barcoID)
  if (!barcoFindID) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const newReporteCargaGOM = new ReporteCargaGOM({
    barcoID: barcoFindID._id,
    ubicacionBuque,
    puestoTerminal,
    fechaAtraco,
    fechaInicioCarga,
    fechaFinalCarga,
    toneladasCargadasGOM,
    tasaDeCargaGOM,
    etc,
    comentariosGOM,
    observacionesGOM,
    reporteCargaGOMCreado,
    reporteCargaGOMModificado
  })
  try {
    const savenewReporteCargaGOM1 = await newReporteCargaGOM.save()

    barcoFindID.reporteCargaGOM = barcoFindID.reporteCargaGOM.concat(
      savenewReporteCargaGOM1._id
    )
    await barcoFindID.save()

    const savenewReporteCargaGOM = await ReporteCargaGOM.findById(
      savenewReporteCargaGOM1._id
    ).populate('barcoID')

    res.status(200).json({
      savenewReporteCargaGOM,
      message: 'Nuevo ReporteCargaGOM Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

reporteCargaGOMCtrl.getReporteCargaGOMs = async (req, res) => {
  try {
    const reporteCargaGOMs = await ReporteCargaGOM.find({}).populate('barcoID')
    res.status(200).json(reporteCargaGOMs)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

reporteCargaGOMCtrl.getReporteCargaGOM = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const reporteCargaGOM = await ReporteCargaGOM.findById(id).populate(
      'barcoID',
      {
        nombre: 1
      }
    )
    if (reporteCargaGOM) {
      res.status(200).json(reporteCargaGOM)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

reporteCargaGOMCtrl.updateReporteCargaGOM = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    barcoID,
    ubicacionBuque,
    puestoTerminal,
    fechaAtraco,
    fechaInicioCarga,
    fechaFinalCarga,
    toneladasCargadasGOM,
    tasaDeCargaGOM,
    etc,
    comentariosGOM,
    observacionesGOM,
    reporteCargaGOMCreado,
    reporteCargaGOMModificado
  } = req.body

  try {
    const updateReporteCargaGOM = await ReporteCargaGOM.findByIdAndUpdate(
      id,
      {
        barcoID,
        ubicacionBuque,
        puestoTerminal,
        fechaAtraco,
        fechaInicioCarga,
        fechaFinalCarga,
        toneladasCargadasGOM,
        tasaDeCargaGOM,
        etc,
        comentariosGOM,
        observacionesGOM,
        reporteCargaGOMCreado,
        reporteCargaGOMModificado
      },
      { new: true }
    ).populate('barcoID')

    res.status(200).json({
      updateReporteCargaGOM,
      message: 'ReporteCargaGOM Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

reporteCargaGOMCtrl.deleteReporteCargaGOM = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await ReporteCargaGOM.findByIdAndDelete(id)
    res.status(200).json({
      message: 'ReporteCargaGOM Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = reporteCargaGOMCtrl

const reporteCargaBuqueCtrl = {}

const Buque = require('../models/BuqueModels')
const ReporteCargaBuque = require('../models/ReporteCargaBuqueModels')

reporteCargaBuqueCtrl.createReporteCargaBuque = async (req, res) => {
  const {
    buqueID,
    ubicacionBuque,
    puestoTerminalBuque,
    materialCargadoBuque,
    tasaDeCargaBuque,
    etcBuque,
    comentariosBuque,
    observacionesBuque,
    climaBuque,
    vientoBuque,
    mareaBuque
  } = req.body

  const buqueFindID = await Buque.findById(buqueID)
  if (!buqueFindID) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const newReporteCargaBuque = new ReporteCargaBuque({
    buqueID: buqueFindID._id,
    ubicacionBuque,
    puestoTerminalBuque,
    materialCargadoBuque,
    tasaDeCargaBuque,
    etcBuque,
    comentariosBuque,
    observacionesBuque,
    climaBuque,
    vientoBuque,
    mareaBuque
  })
  try {
    const savenewReporteCargaBuque1 = await newReporteCargaBuque.save()

    buqueFindID.reporteCargaGOM = buqueFindID.reporteCargaGOM.concat(
      savenewReporteCargaBuque1._id
    )
    await buqueFindID.save()

    const savenewReporteCargaBuque = await ReporteCargaBuque.findById(
      savenewReporteCargaBuque1._id
    ).populate('buqueID')

    res.status(200).json({
      savenewReporteCargaBuque,
      message: 'Nuevo ReporteCargaBuque Agregado.'
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

reporteCargaBuqueCtrl.getReporteCargaBuques = async (req, res) => {
  try {
    const reporteCargaGOMs = await ReporteCargaBuque.find({}).populate(
      'buqueID'
    )
    res.status(200).json(reporteCargaGOMs)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

reporteCargaBuqueCtrl.getReporteCargaBuque = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const reporteCargaGOM = await ReporteCargaBuque.findById(id).populate(
      'buqueID',
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

reporteCargaBuqueCtrl.updateReporteCargaBuque = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    buqueID,
    ubicacionBuque,
    puestoTerminalBuque,
    materialCargadoBuque,
    tasaDeCargaBuque,
    etcBuque,
    comentariosBuque,
    observacionesBuque,
    climaBuque,
    vientoBuque,
    mareaBuque
  } = req.body

  try {
    const updateReporteCargaBuque = await ReporteCargaBuque.findByIdAndUpdate(
      id,
      {
        buqueID,
        ubicacionBuque,

        puestoTerminalBuque,
        materialCargadoBuque,
        tasaDeCargaBuque,
        etcBuque,
        comentariosBuque,
        observacionesBuque,
        climaBuque,
        vientoBuque,
        mareaBuque
      },
      { new: true }
    ).populate('buqueID')

    res.status(200).json({
      updateReporteCargaBuque,
      message: 'ReporteCargaBuque Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

reporteCargaBuqueCtrl.deleteReporteCargaBuque = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await ReporteCargaBuque.findByIdAndDelete(id)
    res.status(200).json({
      message: 'ReporteCargaBuque Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = reporteCargaBuqueCtrl

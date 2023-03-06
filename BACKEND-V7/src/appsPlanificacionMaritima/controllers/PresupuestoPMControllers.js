const presupuestoPMCtrl = {}

const PresupuestoPM = require('../models/PresupuestoPMModels')
const fs = require('fs-extra')
const { uploadImage } = require('../../libs/cloudinary')
presupuestoPMCtrl.createPresupuestoPM = async (req, res) => {
  const {
    descripcionPresupuestoPM,
    montoPresupuestoPM,
    proveedorId,
    fechaEstimadaPresupuestoPM,
    // archivoSoportePresupuestoPM,
    creadoPresupuestoPM,
    modificadoPresupuestoPM
  } = req.body
  try {
    let archivoSoportePresupuestoPM = null
    console.log(req.body)
    if (req.files?.archivoSoportePresupuestoPM) {
      const result = await uploadImage(
        req.files.archivoSoportePresupuestoPM.tempFilePath
      )
      await fs.remove(req.files.archivoSoportePresupuestoPM.tempFilePath)
      archivoSoportePresupuestoPM = {
        url: result.secure_url,
        public_id: result.public_id
      }
    }

    const newPresupuestoPM = new PresupuestoPM({
      descripcionPresupuestoPM,
      montoPresupuestoPM,
      proveedorId,
      fechaEstimadaPresupuestoPM,
      archivoSoportePresupuestoPM,
      creadoPresupuestoPM,
      modificadoPresupuestoPM
    })
    const savePresupuestoPM = await newPresupuestoPM.save()

    res.status(200).json({
      savePresupuestoPM,
      message: 'Nuevo PresupuestoPM Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

presupuestoPMCtrl.getPresupuestoPMs = async (req, res) => {
  try {
    const presupuestoPM = await PresupuestoPM.find({})
    res.status(200).json(presupuestoPM)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err.message
    })
  }
}

presupuestoPMCtrl.getPresupuestoPM = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const presupuestoPM = await PresupuestoPM.findById(id)
    if (presupuestoPM) {
      res.status(200).json(presupuestoPM)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

presupuestoPMCtrl.updatePresupuestoPM = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    descripcionPresupuestoPM,
    montoPresupuestoPM,
    proveedorId,
    fechaEstimadaPresupuestoPM,
    archivoSoportePresupuestoPM,
    creadoPresupuestoPM,
    modificadoPresupuestoPM
  } = req.body

  try {
    const updatePresupuestoPM = await PresupuestoPM.findByIdAndUpdate(
      id,
      {
        descripcionPresupuestoPM,
        montoPresupuestoPM,
        proveedorId,
        fechaEstimadaPresupuestoPM,
        archivoSoportePresupuestoPM,
        creadoPresupuestoPM,
        modificadoPresupuestoPM
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    console.log(updatePresupuestoPM)
    res.status(200).json({
      updatePresupuestoPM,
      message: 'PresupuestoPM Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

presupuestoPMCtrl.deletePresupuestoPM = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await PresupuestoPM.findByIdAndDelete(id)
    res.status(200).json({
      message: 'PresupuestoPM Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

module.exports = presupuestoPMCtrl

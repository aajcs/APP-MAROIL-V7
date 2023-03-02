const actividadMesCtrl = {}

const Actividad = require('../models/ActividadModels')
const fs = require('fs-extra')
const { uploadImage } = require('../../libs/cloudinary')
actividadMesCtrl.createActividad = async (req, res) => {
  const {
    codigoActividad,
    embarcacionId,
    procesoActividad,
    descripcionActividad,
    nivelPrioridadActividad,
    // imagenDefectoActividad,
    // imagenAvanceActividad,
    estatusActividad,
    responsableUsuarioId,
    presupuestoActididadId,
    proveedorId,
    fechaInicioActividad,
    fechaFinActividad
  } = req.body
  try {
    let imagenDefectoActividad = null
    console.log(req.body)
    if (req.files?.imagenDefectoActividad) {
      const result = await uploadImage(
        req.files.imagenDefectoActividad.tempFilePath
      )
      await fs.remove(req.files.imagenDefectoActividad.tempFilePath)
      imagenDefectoActividad = {
        url: result.secure_url,
        public_id: result.public_id
      }
    }
    let imagenAvanceActividad = null
    if (req.files?.imagenAvanceActividad) {
      const result = await uploadImage(
        req.files.imagenAvanceActividad.tempFilePath
      )
      await fs.remove(req.files.imagenAvanceActividad.tempFilePath)
      imagenAvanceActividad = {
        url: result.secure_url,
        public_id: result.public_id
      }
    }
    const newActividad = new Actividad({
      codigoActividad,
      embarcacionId,
      procesoActividad,
      descripcionActividad,
      nivelPrioridadActividad,
      imagenDefectoActividad,
      imagenAvanceActividad,
      estatusActividad,
      responsableUsuarioId,
      presupuestoActididadId,
      proveedorId,
      fechaInicioActividad,
      fechaFinActividad
    })
    const saveActividad = await newActividad.save()

    res.status(200).json({
      saveActividad,
      message: 'Nuevo Actividad Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

actividadMesCtrl.getActividads = async (req, res) => {
  try {
    const actividadMes = await Actividad.find({})
    res.status(200).json(actividadMes)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err.message
    })
  }
}

actividadMesCtrl.getActividad = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const actividadMes = await Actividad.findById(id)
    if (actividadMes) {
      res.status(200).json(actividadMes)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

actividadMesCtrl.updateActividad = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    codigoActividad,
    embarcacionId,
    procesoActividad,
    descripcionActividad,
    nivelPrioridadActividad,
    imagenDefectoActividad,
    imagenAvanceActividad,
    estatusActividad,
    responsableUsuarioId,
    presupuestoActididadId,
    proveedorId,
    fechaInicioActividad,
    fechaFinActividad
  } = req.body

  try {
    const updateActividad = await Actividad.findByIdAndUpdate(
      id,
      {
        codigoActividad,
        embarcacionId,
        procesoActividad,
        descripcionActividad,
        nivelPrioridadActividad,
        imagenDefectoActividad,
        imagenAvanceActividad,
        estatusActividad,
        responsableUsuarioId,
        presupuestoActididadId,
        proveedorId,
        fechaInicioActividad,
        fechaFinActividad
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    console.log(updateActividad)
    res.status(200).json({
      updateActividad,
      message: 'Actividad Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

actividadMesCtrl.deleteActividad = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Actividad.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Actividad Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

module.exports = actividadMesCtrl

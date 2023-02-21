const costoTmMesCtrl = {}

const Actividad = require('../models/ActividadModels')

costoTmMesCtrl.createActividad = async (req, res) => {
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

costoTmMesCtrl.getActividads = async (req, res) => {
  try {
    const costoTmMes = await Actividad.find({})
    res.status(200).json(costoTmMes)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err.message
    })
  }
}

costoTmMesCtrl.getActividad = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const costoTmMes = await Actividad.findById(id)
    if (costoTmMes) {
      res.status(200).json(costoTmMes)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

costoTmMesCtrl.updateActividad = async (req, res) => {
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

costoTmMesCtrl.deleteActividad = async (req, res) => {
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

module.exports = costoTmMesCtrl

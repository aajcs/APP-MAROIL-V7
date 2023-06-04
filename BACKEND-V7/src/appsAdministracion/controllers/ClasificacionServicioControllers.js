const clasificacionServicioCtrl = {}

const ClasificacionServicio = require('../models/ClasificacionServicioModels')

clasificacionServicioCtrl.createClasificacionServicio = async (req, res) => {
  const {
    codigoClasificacionServicio,
    nombreClasificacionServicio,
    descripcionClasificacionServicio,
    estatusClasificacionServicio,
    creadoClasificacionServicio,
    modificadoClasificacionServicio,
    actividadAsociadaId
  } = req.body
  try {
    const newClasificacionServicio = new ClasificacionServicio({
      codigoClasificacionServicio,
      nombreClasificacionServicio,
      descripcionClasificacionServicio,
      estatusClasificacionServicio,
      creadoClasificacionServicio,
      modificadoClasificacionServicio,
      actividadAsociadaId
    })
    const saveClasificacionServicio1 = await newClasificacionServicio.save()

    const saveClasificacionServicio = await ClasificacionServicio.findById(
      saveClasificacionServicio1.id
    ).populate('actividadAsociadaId', {
      nombreActividadAsociada: 1
    })

    if (saveClasificacionServicio) {
      res.status(200).json({
        saveClasificacionServicio,
        message: 'Nuevo ClasificacionServicio Agregado.'
      })
    } else {
      res.status(404).end()
    }

    // console.log(saveClasificacionServicio)
    // res.status(200).json({
    //   saveClasificacionServicio,
    //   message: 'Nuevo ClasificacionServicio Agregado.'
    // })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

clasificacionServicioCtrl.getClasificacionServicios = async (req, res) => {
  try {
    const clasificacionServicio = await ClasificacionServicio.find({}).populate(
      'actividadAsociadaId',
      {
        nombreActividadAsociada: 1
      }
    )

    res.status(200).json(clasificacionServicio)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

clasificacionServicioCtrl.getClasificacionServicio = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const clasificacionServicio = await ClasificacionServicio.findById(id)
    if (clasificacionServicio) {
      res.status(200).json(clasificacionServicio)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

clasificacionServicioCtrl.updateClasificacionServicio = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    codigoClasificacionServicio,
    nombreClasificacionServicio,
    descripcionClasificacionServicio,
    estatusClasificacionServicio,
    creadoClasificacionServicio,
    modificadoClasificacionServicio,
    actividadAsociadaId
  } = req.body

  try {
    const updateClasificacionServicio =
      await ClasificacionServicio.findByIdAndUpdate(
        id,
        {
          codigoClasificacionServicio,
          nombreClasificacionServicio,
          descripcionClasificacionServicio,
          estatusClasificacionServicio,
          creadoClasificacionServicio,
          modificadoClasificacionServicio,
          actividadAsociadaId
        },
        { new: true }
      ).populate('actividadAsociadaId', {
        nombreActividadAsociada: 1
      })

    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateClasificacionServicio,
      message: 'ClasificacionServicio Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

clasificacionServicioCtrl.deleteClasificacionServicio = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await ClasificacionServicio.findByIdAndDelete(id)
    res.status(200).json({
      message: 'ClasificacionServicio Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = clasificacionServicioCtrl

const actividadAsociadaCtrl = {}

const ActividadAsociada = require('../models/ActividadAsociadaModels')

actividadAsociadaCtrl.createActividadAsociada = async (req, res) => {
  const {
    codigoActividadAsociada,
    nombreActividadAsociada,
    descripcionActividadAsociada,
    estatusActividadAsociada,
    creadoActividadAsociada,
    modificadoActividadAsociada
  } = req.body
  try {
    const newActividadAsociada = new ActividadAsociada({
      codigoActividadAsociada,
      nombreActividadAsociada,
      descripcionActividadAsociada,
      estatusActividadAsociada,
      creadoActividadAsociada,
      modificadoActividadAsociada
    })
    const saveActividadAsociada1 = await newActividadAsociada.save()

    const saveActividadAsociada = await ActividadAsociada.findById(
      saveActividadAsociada1.id
    )

    if (saveActividadAsociada) {
      res.status(200).json({
        saveActividadAsociada,
        message: 'Nuevo ActividadAsociada Agregado.'
      })
    } else {
      res.status(404).end()
    }

    // console.log(saveActividadAsociada)
    // res.status(200).json({
    //   saveActividadAsociada,
    //   message: 'Nuevo ActividadAsociada Agregado.'
    // })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

actividadAsociadaCtrl.getActividadAsociadas = async (req, res) => {
  try {
    const actividadAsociada = await ActividadAsociada.find({})

    res.status(200).json(actividadAsociada)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

actividadAsociadaCtrl.getActividadAsociada = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const actividadAsociada = await ActividadAsociada.findById(id)
    if (actividadAsociada) {
      res.status(200).json(actividadAsociada)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

actividadAsociadaCtrl.updateActividadAsociada = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    codigoActividadAsociada,
    nombreActividadAsociada,
    descripcionActividadAsociada,
    estatusActividadAsociada,
    creadoActividadAsociada,
    modificadoActividadAsociada
  } = req.body

  try {
    const updateActividadAsociada = await ActividadAsociada.findByIdAndUpdate(
      id,
      {
        codigoActividadAsociada,
        nombreActividadAsociada,
        descripcionActividadAsociada,
        estatusActividadAsociada,
        creadoActividadAsociada,
        modificadoActividadAsociada
      },
      { new: true }
    )

    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateActividadAsociada,
      message: 'ActividadAsociada Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

actividadAsociadaCtrl.deleteActividadAsociada = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await ActividadAsociada.findByIdAndDelete(id)
    res.status(200).json({
      message: 'ActividadAsociada Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = actividadAsociadaCtrl

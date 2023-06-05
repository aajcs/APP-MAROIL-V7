const clasificacion3erNivelCtrl = {}

const Clasificacion3erNivel = require('../models/Clasificacion3erNivelModels')

clasificacion3erNivelCtrl.createClasificacion3erNivel = async (req, res) => {
  const {
    codigoClasificacion3erNivel,
    nombreClasificacion3erNivel,
    descripcionClasificacion3erNivel,
    estatusClasificacion3erNivel,
    creadoClasificacion3erNivel,
    modificadoClasificacion3erNivel,
    clasificacionServicioId
  } = req.body
  try {
    const newClasificacion3erNivel = new Clasificacion3erNivel({
      codigoClasificacion3erNivel,
      nombreClasificacion3erNivel,
      descripcionClasificacion3erNivel,
      estatusClasificacion3erNivel,
      creadoClasificacion3erNivel,
      modificadoClasificacion3erNivel,
      clasificacionServicioId
    })
    const saveClasificacion3erNivel1 = await newClasificacion3erNivel.save()

    const saveClasificacion3erNivel = await Clasificacion3erNivel.findById(
      saveClasificacion3erNivel1.id
    ).populate('clasificacionServicioId', {
      nombreClasificacionServicio: 1
    })

    if (saveClasificacion3erNivel) {
      res.status(200).json({
        saveClasificacion3erNivel,
        message: 'Nuevo Clasificacion3erNivel Agregado.'
      })
    } else {
      res.status(404).end()
    }

    // console.log(saveClasificacion3erNivel)
    // res.status(200).json({
    //   saveClasificacion3erNivel,
    //   message: 'Nuevo Clasificacion3erNivel Agregado.'
    // })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

clasificacion3erNivelCtrl.getClasificacion3erNivels = async (req, res) => {
  try {
    const clasificacion3erNivel = await Clasificacion3erNivel.find({}).populate(
      'clasificacionServicioId',
      {
        nombreClasificacionServicio: 1
      }
    )

    res.status(200).json(clasificacion3erNivel)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

clasificacion3erNivelCtrl.getClasificacion3erNivel = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const clasificacion3erNivel = await Clasificacion3erNivel.findById(id)
    if (clasificacion3erNivel) {
      res.status(200).json(clasificacion3erNivel)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

clasificacion3erNivelCtrl.updateClasificacion3erNivel = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    codigoClasificacion3erNivel,
    nombreClasificacion3erNivel,
    descripcionClasificacion3erNivel,
    estatusClasificacion3erNivel,
    creadoClasificacion3erNivel,
    modificadoClasificacion3erNivel,
    clasificacionServicioId
  } = req.body

  try {
    const updateClasificacion3erNivel =
      await Clasificacion3erNivel.findByIdAndUpdate(
        id,
        {
          codigoClasificacion3erNivel,
          nombreClasificacion3erNivel,
          descripcionClasificacion3erNivel,
          estatusClasificacion3erNivel,
          creadoClasificacion3erNivel,
          modificadoClasificacion3erNivel,
          clasificacionServicioId
        },
        { new: true }
      ).populate('clasificacionServicioId', {
        nombreClasificacionServicio: 1
      })

    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateClasificacion3erNivel,
      message: 'Clasificacion3erNivel Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

clasificacion3erNivelCtrl.deleteClasificacion3erNivel = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Clasificacion3erNivel.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Clasificacion3erNivel Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = clasificacion3erNivelCtrl

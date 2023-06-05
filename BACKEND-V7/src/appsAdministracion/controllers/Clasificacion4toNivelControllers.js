const clasificacion4toNivelCtrl = {}

const Clasificacion4toNivel = require('../models/Clasificacion4toNivelModels')

clasificacion4toNivelCtrl.createClasificacion4toNivel = async (req, res) => {
  const {
    codigoClasificacion4toNivel,
    nombreClasificacion4toNivel,
    descripcionClasificacion4toNivel,
    estatusClasificacion4toNivel,
    creadoClasificacion4toNivel,
    modificadoClasificacion4toNivel,
    clasificacion3erNivelId
  } = req.body
  try {
    const newClasificacion4toNivel = new Clasificacion4toNivel({
      codigoClasificacion4toNivel,
      nombreClasificacion4toNivel,
      descripcionClasificacion4toNivel,
      estatusClasificacion4toNivel,
      creadoClasificacion4toNivel,
      modificadoClasificacion4toNivel,
      clasificacion3erNivelId
    })
    const saveClasificacion4toNivel1 = await newClasificacion4toNivel.save()

    const saveClasificacion4toNivel = await Clasificacion4toNivel.findById(
      saveClasificacion4toNivel1.id
    ).populate('clasificacion3erNivelId', {
      nombreClasificacion3erNivel: 1
    })

    if (saveClasificacion4toNivel) {
      res.status(200).json({
        saveClasificacion4toNivel,
        message: 'Nuevo Clasificacion4toNivel Agregado.'
      })
    } else {
      res.status(404).end()
    }

    // console.log(saveClasificacion4toNivel)
    // res.status(200).json({
    //   saveClasificacion4toNivel,
    //   message: 'Nuevo Clasificacion4toNivel Agregado.'
    // })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

clasificacion4toNivelCtrl.getClasificacion4toNivels = async (req, res) => {
  try {
    const clasificacion4toNivel = await Clasificacion4toNivel.find({}).populate(
      'clasificacion3erNivelId',
      {
        nombreClasificacion3erNivel: 1
      }
    )

    res.status(200).json(clasificacion4toNivel)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

clasificacion4toNivelCtrl.getClasificacion4toNivel = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const clasificacion4toNivel = await Clasificacion4toNivel.findById(id)
    if (clasificacion4toNivel) {
      res.status(200).json(clasificacion4toNivel)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

clasificacion4toNivelCtrl.updateClasificacion4toNivel = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    codigoClasificacion4toNivel,
    nombreClasificacion4toNivel,
    descripcionClasificacion4toNivel,
    estatusClasificacion4toNivel,
    creadoClasificacion4toNivel,
    modificadoClasificacion4toNivel,
    clasificacion3erNivelId
  } = req.body

  try {
    const updateClasificacion4toNivel =
      await Clasificacion4toNivel.findByIdAndUpdate(
        id,
        {
          codigoClasificacion4toNivel,
          nombreClasificacion4toNivel,
          descripcionClasificacion4toNivel,
          estatusClasificacion4toNivel,
          creadoClasificacion4toNivel,
          modificadoClasificacion4toNivel,
          clasificacion3erNivelId
        },
        { new: true }
      ).populate('clasificacion3erNivelId', {
        nombreClasificacion3erNivel: 1
      })

    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateClasificacion4toNivel,
      message: 'Clasificacion4toNivel Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

clasificacion4toNivelCtrl.deleteClasificacion4toNivel = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Clasificacion4toNivel.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Clasificacion4toNivel Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = clasificacion4toNivelCtrl

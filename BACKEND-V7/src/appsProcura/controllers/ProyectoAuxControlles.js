const proyectoAuxCtrl = {}

const ProyectoAux = require('../models/ProyectoAuxModels')

proyectoAuxCtrl.createProyectoAux = async (req, res) => {
  const {
    nombreProyecto,
    descripcionProyecto,
    estatusProyecto,
    proyectoAuxCreado,
    proyectoAuxModificado
  } = req.body
  try {
    const newProyectoAux = new ProyectoAux({
      nombreProyecto,
      descripcionProyecto,
      estatusProyecto,
      proyectoAuxCreado,
      proyectoAuxModificado
    })
    const saveProyectoAux = await newProyectoAux.save()

    res.status(200).json({
      saveProyectoAux,
      message: 'Nuevo ProyectoAux Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

proyectoAuxCtrl.getProyectoAuxs = async (req, res) => {
  try {
    const proyectoAux = await ProyectoAux.find({})
    res.status(200).json(proyectoAux)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

proyectoAuxCtrl.getProyectoAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const proyectoAux = await ProyectoAux.findById(id)
    if (proyectoAux) {
      res.status(200).json(proyectoAux)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

proyectoAuxCtrl.updateProyectoAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    nombreProyecto,
    descripcionProyecto,
    estatusProyecto,
    proyectoAuxCreado,
    proyectoAuxModificado
  } = req.body

  try {
    const updategabarra = await ProyectoAux.findByIdAndUpdate(
      id,
      {
        nombreProyecto,
        descripcionProyecto,
        estatusProyecto,
        proyectoAuxCreado,
        proyectoAuxModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updategabarra,
      message: 'ProyectoAux Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

proyectoAuxCtrl.deleteProyectoAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await ProyectoAux.findByIdAndDelete(id)
    res.status(200).json({
      message: 'ProyectoAux Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = proyectoAuxCtrl

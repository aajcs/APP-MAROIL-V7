const departamentoAuxCtrl = {}

const DepartamentoAux = require('../models/DepartamentoAuxModels')

departamentoAuxCtrl.createDepartamentoAux = async (req, res) => {
  const {
    nombreProyecto,
    descripcionProyecto,
    estatusProyecto,
    departamentoAuxCreado,
    departamentoAuxModificado
  } = req.body
  try {
    const newDepartamentoAux = new DepartamentoAux({
      nombreProyecto,
      descripcionProyecto,
      estatusProyecto,
      departamentoAuxCreado,
      departamentoAuxModificado
    })
    const saveDepartamentoAux = await newDepartamentoAux.save()

    res.status(200).json({
      saveDepartamentoAux,
      message: 'Nuevo DepartamentoAux Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

departamentoAuxCtrl.getDepartamentoAuxs = async (req, res) => {
  try {
    const departamentoAux = await DepartamentoAux.find({})
    res.status(200).json(departamentoAux)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

departamentoAuxCtrl.getDepartamentoAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const departamentoAux = await DepartamentoAux.findById(id)
    if (departamentoAux) {
      res.status(200).json(departamentoAux)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

departamentoAuxCtrl.updateDepartamentoAux = async (req, res) => {
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
    departamentoAuxCreado,
    departamentoAuxModificado
  } = req.body

  try {
    const updategabarra = await DepartamentoAux.findByIdAndUpdate(
      id,
      {
        nombreProyecto,
        descripcionProyecto,
        estatusProyecto,
        departamentoAuxCreado,
        departamentoAuxModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updategabarra,
      message: 'DepartamentoAux Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

departamentoAuxCtrl.deleteDepartamentoAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await DepartamentoAux.findByIdAndDelete(id)
    res.status(200).json({
      message: 'DepartamentoAux Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = departamentoAuxCtrl

const ingresoGastoCtrl = {}

const IngresoGasto = require('../models/IngresoGastoModels')

ingresoGastoCtrl.createIngresoGasto = async (req, res) => {
  const {
    fechaIngresoGasto,
    conceptoIngresoGasto,
    ingresoIngresoGasto,
    egresoIngresoGasto,
    estatusIngresoGasto,
    procesoAuxId,
    proveedorId,
    centroDeCostoAuxId,
    userCreatorId,
    ingresoGastoCreado,
    ingresoGastoModificado
  } = req.body
  try {
    const newIngresoGasto = new IngresoGasto({
      fechaIngresoGasto,
      conceptoIngresoGasto,
      ingresoIngresoGasto,
      egresoIngresoGasto,
      estatusIngresoGasto,
      procesoAuxId,
      proveedorId,
      centroDeCostoAuxId,
      userCreatorId,
      ingresoGastoCreado,
      ingresoGastoModificado
    })
    const saveIngresoGasto = await newIngresoGasto.save()

    res.status(200).json({
      saveIngresoGasto,
      message: 'Nuevo IngresoGasto Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

ingresoGastoCtrl.getIngresoGastos = async (req, res) => {
  try {
    const ingresoGasto = await IngresoGasto.find({})
    res.status(200).json(ingresoGasto)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

ingresoGastoCtrl.getIngresoGasto = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const ingresoGasto = await IngresoGasto.findById(id)
    if (ingresoGasto) {
      res.status(200).json(ingresoGasto)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

ingresoGastoCtrl.updateIngresoGasto = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    fechaIngresoGasto,
    conceptoIngresoGasto,
    ingresoIngresoGasto,
    egresoIngresoGasto,
    estatusIngresoGasto,
    procesoAuxId,
    proveedorId,
    centroDeCostoAuxId,
    userCreatorId,
    ingresoGastoCreado,
    ingresoGastoModificado
  } = req.body

  try {
    const updateIngresoGasto = await IngresoGasto.findByIdAndUpdate(
      id,
      {
        fechaIngresoGasto,
        conceptoIngresoGasto,
        ingresoIngresoGasto,
        egresoIngresoGasto,
        estatusIngresoGasto,
        procesoAuxId,
        proveedorId,
        centroDeCostoAuxId,
        userCreatorId,
        ingresoGastoCreado,
        ingresoGastoModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateIngresoGasto,
      message: 'IngresoGasto Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

ingresoGastoCtrl.deleteIngresoGasto = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await IngresoGasto.findByIdAndDelete(id)
    res.status(200).json({
      message: 'IngresoGasto Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = ingresoGastoCtrl

const ingresoGastoCtrl = {}

const IngresoGasto = require('../models/IngresoGastoModels')

ingresoGastoCtrl.createIngresoGasto = async (req, res) => {
  const {
    fechaIngresoGasto,
    conceptoAuxId,
    ingresoIngresoGasto,
    egresoIngresoGasto,
    descripcionIngresoGasto,
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
      conceptoAuxId,
      ingresoIngresoGasto,
      descripcionIngresoGasto,
      egresoIngresoGasto,
      estatusIngresoGasto,
      procesoAuxId,
      proveedorId,
      centroDeCostoAuxId,
      userCreatorId,
      ingresoGastoCreado,
      ingresoGastoModificado
    })
    const saveIngresoGasto1 = await newIngresoGasto.save()

    const saveIngresoGasto = await IngresoGasto.findById(saveIngresoGasto1.id)
      .populate('procesoAuxId', {
        nombreProceso: 1
      })
      .populate('proveedorId', {
        nombreProveedor: 1
      })
      .populate('centroDeCostoAuxId', {
        nombreCentroDeCosto: 1
      })
      .populate('conceptoAuxId', {
        nombreConceptoAux: 1
      })
    if (saveIngresoGasto) {
      res.status(200).json({
        saveIngresoGasto,
        message: 'Nuevo IngresoGasto Agregado.'
      })
    } else {
      res.status(404).end()
    }

    // console.log(saveIngresoGasto)
    // res.status(200).json({
    //   saveIngresoGasto,
    //   message: 'Nuevo IngresoGasto Agregado.'
    // })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

ingresoGastoCtrl.getIngresoGastos = async (req, res) => {
  try {
    const ingresoGasto = await IngresoGasto.find({})
      .populate('procesoAuxId', {
        nombreProceso: 1
      })
      .populate('proveedorId', {
        nombreProveedor: 1
      })
      .populate('centroDeCostoAuxId', {
        nombreCentroDeCosto: 1
      })
      .populate('conceptoAuxId', {
        nombreConceptoAux: 1
      })
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
    conceptoAuxId,
    ingresoIngresoGasto,
    egresoIngresoGasto,
    descripcionIngresoGasto,
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
        conceptoAuxId,
        ingresoIngresoGasto,
        egresoIngresoGasto,
        descripcionIngresoGasto,
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
      .populate('procesoAuxId', {
        nombreProceso: 1
      })
      .populate('proveedorId', {
        nombreProveedor: 1
      })
      .populate('centroDeCostoAuxId', {
        nombreCentroDeCosto: 1
      })
      .populate('conceptoAuxId', {
        nombreConceptoAux: 1
      })
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

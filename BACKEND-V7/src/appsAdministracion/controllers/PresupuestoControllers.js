const presupuestorCtrl = {}

const Presupuesto = require('../models/PresupuestoModels')

presupuestorCtrl.createPresupuesto = async (req, res) => {
  const {
    fechaRequeridaPresupuesto,
    codigoPresupuesto,
    conceptoPresupuesto,
    tipoPresupuesto,
    actividadPresupuesto,
    montoPresupuesto,
    estatusPresupuesto,
    procesoAuxId,
    proveedorId,
    centroDeCostoAuxId,
    userCreatorId,
    PresupuestoCreado,
    PresupuestoModificado
  } = req.body
  try {
    const newPresupuesto = new Presupuesto({
      fechaRequeridaPresupuesto,
      codigoPresupuesto,
      conceptoPresupuesto,
      tipoPresupuesto,
      actividadPresupuesto,
      montoPresupuesto,
      estatusPresupuesto,
      procesoAuxId,
      proveedorId,
      centroDeCostoAuxId,
      userCreatorId,
      PresupuestoCreado,
      PresupuestoModificado
    })
    const savePresupuesto = await newPresupuesto.save()

    res.status(200).json({
      savePresupuesto,
      message: 'Nuevo Presupuesto Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

presupuestorCtrl.getPresupuestos = async (req, res) => {
  try {
    const presupuestor = await Presupuesto.find({})
    res.status(200).json(presupuestor)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

presupuestorCtrl.getPresupuesto = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const presupuestor = await Presupuesto.findById(id)
    if (presupuestor) {
      res.status(200).json(presupuestor)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

presupuestorCtrl.updatePresupuesto = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    fechaRequeridaPresupuesto,
    codigoPresupuesto,
    conceptoPresupuesto,
    tipoPresupuesto,
    actividadPresupuesto,
    montoPresupuesto,
    estatusPresupuesto,
    procesoAuxId,
    proveedorId,
    centroDeCostoAuxId,
    userCreatorId,
    PresupuestoCreado,
    PresupuestoModificado
  } = req.body

  try {
    const updatePresupuesto = await Presupuesto.findByIdAndUpdate(
      id,
      {
        fechaRequeridaPresupuesto,
        codigoPresupuesto,
        conceptoPresupuesto,
        tipoPresupuesto,
        actividadPresupuesto,
        montoPresupuesto,
        estatusPresupuesto,
        procesoAuxId,
        proveedorId,
        centroDeCostoAuxId,
        userCreatorId,
        PresupuestoCreado,
        PresupuestoModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updatePresupuesto,
      message: 'Presupuesto Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

presupuestorCtrl.deletePresupuesto = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Presupuesto.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Presupuesto Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = presupuestorCtrl

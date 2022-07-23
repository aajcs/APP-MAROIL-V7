const requisicionMaterialesCtrl = {}

const RequisicionMateriales = require('../models/RequisicionMaterialesModels')

requisicionMaterialesCtrl.createRequisicionMateriales = async (req, res) => {
  const {
    fechaElaboracion,
    fechaRequerida,
    elaboradoPor,
    fechaElaboradoPor,
    aprobadoPor,
    fechaAprobadoPor,
    observaiones,
    correlativoRequisicion,
    estatusRequisicionMateriales,
    proyectoAuxId,
    departamentoAuxId,
    prioridadAuxId,
    activosId,
    centroDeCostoAuxId,
    requisicionMaterialesItemsId,
    requisicionMaterialesCreado,
    requisicionMaterialesModificado
  } = req.body
  try {
    const newRequisicionMateriales = new RequisicionMateriales({
      fechaElaboracion,
      fechaRequerida,
      elaboradoPor,
      fechaElaboradoPor,
      aprobadoPor,
      fechaAprobadoPor,
      observaiones,
      correlativoRequisicion,
      estatusRequisicionMateriales,
      proyectoAuxId,
      departamentoAuxId,
      prioridadAuxId,
      activosId,
      centroDeCostoAuxId,
      requisicionMaterialesItemsId,
      requisicionMaterialesCreado,
      requisicionMaterialesModificado
    })
    const saveRequisicionMateriales = await newRequisicionMateriales.save()

    res.status(200).json({
      saveRequisicionMateriales,
      message: 'Nuevo RequisicionMateriales Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

requisicionMaterialesCtrl.getRequisicionMaterialess = async (req, res) => {
  try {
    const requisicionMateriales = await RequisicionMateriales.find({})
      .populate('proyectoAuxId')
      .populate('departamentoAuxId')
      .populate('prioridadAuxId')
      // .populate('activosId')
      .populate('centroDeCostoAuxId')
      .populate('requisicionMaterialesItemsId')
    res.status(200).json(requisicionMateriales)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

requisicionMaterialesCtrl.getRequisicionMateriales = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const requisicionMateriale = await RequisicionMateriales.findById(id)
      .populate('proyectoAuxId')
      .populate('departamentoAuxId')
      .populate('prioridadAuxId')
      // .populate('activosId')
      .populate('centroDeCostoAuxId')
      .populate('requisicionMaterialesItemsId')
    if (requisicionMateriale) {
      res.status(200).json(requisicionMateriale)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

requisicionMaterialesCtrl.updateRequisicionMateriales = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    fechaElaboracion,
    fechaRequerida,
    elaboradoPor,
    fechaElaboradoPor,
    aprobadoPor,
    fechaAprobadoPor,
    observaiones,
    correlativoRequisicion,
    estatusRequisicionMateriales,
    proyectoAuxId,
    departamentoAuxId,
    prioridadAuxId,
    activosId,
    centroDeCostoAuxId,
    requisicionMaterialesItemsId,
    requisicionMaterialesCreado,
    requisicionMaterialesModificado
  } = req.body

  try {
    const updateRequisicionMateriales =
      await RequisicionMateriales.findByIdAndUpdate(
        id,
        {
          fechaElaboracion,
          fechaRequerida,
          elaboradoPor,
          fechaElaboradoPor,
          aprobadoPor,
          fechaAprobadoPor,
          observaiones,
          correlativoRequisicion,
          estatusRequisicionMateriales,
          proyectoAuxId,
          departamentoAuxId,
          prioridadAuxId,
          activosId,
          centroDeCostoAuxId,
          requisicionMaterialesItemsId,
          requisicionMaterialesCreado,
          requisicionMaterialesModificado
        },
        { new: true }
      )
    res.status(200).json({
      updateRequisicionMateriales,
      message: 'RequisicionMateriales Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

requisicionMaterialesCtrl.deleteRequisicionMateriales = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await RequisicionMateriales.findByIdAndDelete(id)
    res.status(200).json({
      message: 'RequisicionMateriales Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = requisicionMaterialesCtrl

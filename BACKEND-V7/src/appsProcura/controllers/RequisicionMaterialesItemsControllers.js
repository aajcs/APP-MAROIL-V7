const requisicionMaterialesItemsGOMCtrl = {}

const RequisicionMateriales = require('../models/RequisicionMaterialesModels')
const RequisicionMaterialesItems = require('../models/RequisicionMaterialesItemsModels')

requisicionMaterialesItemsGOMCtrl.createRequisicionMaterialesItems = async (
  req,
  res
) => {
  const {
    requisicionMaterialesId,
    cantidadMaterial,
    unidadAuxId,
    descripcionMateial,
    informacionAdicional,
    imagenReferencia,
    estatusrequisicionMaterialesItems,
    requisicionMaterialesItemsCreado,
    requisicionMaterialesItemsModificado
  } = req.body

  const requisicionMaterialesIdFind = await RequisicionMateriales.findById(
    requisicionMaterialesId
  )
  if (!requisicionMaterialesIdFind) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const newRequisicionMaterialesItems = new RequisicionMaterialesItems({
    requisicionMaterialesId: requisicionMaterialesIdFind._id,
    cantidadMaterial,
    unidadAuxId,
    descripcionMateial,
    informacionAdicional,
    imagenReferencia,
    estatusrequisicionMaterialesItems,
    requisicionMaterialesItemsCreado,
    requisicionMaterialesItemsModificado
  })
  try {
    const savenewRequisicionMaterialesItems1 =
      await newRequisicionMaterialesItems.save()

    requisicionMaterialesIdFind.requisicionMaterialesItemsId =
      requisicionMaterialesIdFind.requisicionMaterialesItemsId.concat(
        savenewRequisicionMaterialesItems1._id
      )
    await requisicionMaterialesIdFind.save()

    const savenewRequisicionMaterialesItems =
      await RequisicionMaterialesItems.findById(
        savenewRequisicionMaterialesItems1._id
      ).populate('requisicionMaterialesId')

    res.status(200).json({
      savenewRequisicionMaterialesItems,
      message: 'Nuevo RequisicionMaterialesItems Agregado.'
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

requisicionMaterialesItemsGOMCtrl.getRequisicionMaterialesItemss = async (
  req,
  res
) => {
  try {
    const requisicionMaterialesItemsGOMs =
      await RequisicionMaterialesItems.find({})
        .populate('requisicionMaterialesId')
        .populate('unidadAuxId')
    res.status(200).json(requisicionMaterialesItemsGOMs)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

requisicionMaterialesItemsGOMCtrl.getRequisicionMaterialesItems = async (
  req,
  res
) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const requisicionMaterialesItemsGOM =
      await RequisicionMaterialesItems.findById(id).populate(
        'RequisicionMateriales'
      )
    if (requisicionMaterialesItemsGOM) {
      res.status(200).json(requisicionMaterialesItemsGOM)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

requisicionMaterialesItemsGOMCtrl.updateRequisicionMaterialesItems = async (
  req,
  res
) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    requisicionMaterialesId,
    cantidadMaterial,
    unidadAuxId,
    descripcionMateial,
    informacionAdicional,
    imagenReferencia,
    estatusrequisicionMaterialesItems,
    requisicionMaterialesItemsCreado,
    requisicionMaterialesItemsModificado
  } = req.body

  try {
    const updateRequisicionMaterialesItems =
      await RequisicionMaterialesItems.findByIdAndUpdate(
        id,
        {
          requisicionMaterialesId,
          cantidadMaterial,
          unidadAuxId,
          descripcionMateial,
          informacionAdicional,
          imagenReferencia,
          estatusrequisicionMaterialesItems,
          requisicionMaterialesItemsCreado,
          requisicionMaterialesItemsModificado
        },
        { new: true }
      ).populate('RequisicionMateriales')

    res.status(200).json({
      updateRequisicionMaterialesItems,
      message: 'RequisicionMaterialesItems Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

requisicionMaterialesItemsGOMCtrl.deleteRequisicionMaterialesItems = async (
  req,
  res
) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await RequisicionMaterialesItems.findByIdAndDelete(id)
    res.status(200).json({
      message: 'RequisicionMaterialesItems Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = requisicionMaterialesItemsGOMCtrl

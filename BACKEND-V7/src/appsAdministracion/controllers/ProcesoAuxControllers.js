const procesoAuxCtrl = {}

const ProcesoAux = require('../models/ProcesoAuxModels')

procesoAuxCtrl.createProcesoAux = async (req, res) => {
  const {
    codigoProceso,
    nombreProceso,
    descripcionProceso,
    estatusProceso,
    procesoCreado,
    procesoModificado
  } = req.body
  try {
    const newProcesoAux = new ProcesoAux({
      codigoProceso,
      nombreProceso,
      descripcionProceso,
      estatusProceso,
      procesoCreado,
      procesoModificado
    })
    const saveProcesoAux = await newProcesoAux.save()

    res.status(200).json({
      saveProcesoAux,
      message: 'Nuevo ProcesoAux Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

procesoAuxCtrl.getProcesoAuxs = async (req, res) => {
  try {
    const procesoAux = await ProcesoAux.find({})
    res.status(200).json(procesoAux)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

procesoAuxCtrl.getProcesoAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const procesoAux = await ProcesoAux.findById(id)
    if (procesoAux) {
      res.status(200).json(procesoAux)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

procesoAuxCtrl.updateProcesoAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    codigoProceso,
    nombreProceso,
    descripcionProceso,
    estatusProceso,
    procesoCreado,
    procesoModificado
  } = req.body

  try {
    const updateProceso = await ProcesoAux.findByIdAndUpdate(
      id,
      {
        codigoProceso,
        nombreProceso,
        descripcionProceso,
        estatusProceso,
        procesoCreado,
        procesoModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    console.log(updateProceso)
    res.status(200).json({
      updateProceso,
      message: 'ProcesoAux Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

procesoAuxCtrl.deleteProcesoAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await ProcesoAux.findByIdAndDelete(id)
    res.status(200).json({
      message: 'ProcesoAux Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = procesoAuxCtrl

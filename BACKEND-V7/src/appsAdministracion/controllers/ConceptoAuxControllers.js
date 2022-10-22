const conceptoAuxtotrl = {}

const ConceptoAux = require('../models/ConceptoAuxModels')

conceptoAuxtotrl.createConceptoAux = async (req, res) => {
  const {
    codigoConceptoAux,
    nombreConceptoAux,
    descripcionConceptoAux,
    estatusConceptoAux,
    conceptoAuxCreado,
    conceptoAuxModificado
  } = req.body
  try {
    const newConceptoAux = new ConceptoAux({
      codigoConceptoAux,
      nombreConceptoAux,
      descripcionConceptoAux,
      estatusConceptoAux,
      conceptoAuxCreado,
      conceptoAuxModificado
    })
    const saveConceptoAux = await newConceptoAux.save()

    res.status(200).json({
      saveConceptoAux,
      message: 'Nuevo ConceptoAux Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

conceptoAuxtotrl.getConceptoAuxs = async (req, res) => {
  try {
    const conceptoAuxAux = await ConceptoAux.find({})
    res.status(200).json(conceptoAuxAux)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

conceptoAuxtotrl.getConceptoAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const conceptoAuxAux = await ConceptoAux.findById(id)
    if (conceptoAuxAux) {
      res.status(200).json(conceptoAuxAux)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

conceptoAuxtotrl.updateConceptoAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    codigoConceptoAux,
    nombreConceptoAux,
    descripcionConceptoAux,
    estatusConceptoAux,
    conceptoAuxCreado,
    conceptoAuxModificado
  } = req.body

  try {
    const updateConceptoAux = await ConceptoAux.findByIdAndUpdate(
      id,
      {
        codigoConceptoAux,
        nombreConceptoAux,
        descripcionConceptoAux,
        estatusConceptoAux,
        conceptoAuxCreado,
        conceptoAuxModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    console.log(updateConceptoAux)
    res.status(200).json({
      updateConceptoAux,
      message: 'ConceptoAux Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

conceptoAuxtotrl.deleteConceptoAux = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await ConceptoAux.findByIdAndDelete(id)
    res.status(200).json({
      message: 'ConceptoAux Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = conceptoAuxtotrl

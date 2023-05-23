const dominioCtrl = {}

const Dominio = require('../models/DominioModels')

dominioCtrl.createDominio = async (req, res) => {
  const {
    codigoDominio,
    nombreDominio,
    descripcionDominio,
    estatusDominio,
    creadoDominio,
    modificadoDominio
  } = req.body
  try {
    const newDominio = new Dominio({
      codigoDominio,
      nombreDominio,
      descripcionDominio,
      estatusDominio,
      creadoDominio,
      modificadoDominio
    })
    const saveDominio1 = await newDominio.save()

    const saveDominio = await Dominio.findById(saveDominio1.id)

    if (saveDominio) {
      res.status(200).json({
        saveDominio,
        message: 'Nuevo Dominio Agregado.'
      })
    } else {
      res.status(404).end()
    }

    // console.log(saveDominio)
    // res.status(200).json({
    //   saveDominio,
    //   message: 'Nuevo Dominio Agregado.'
    // })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

dominioCtrl.getDominios = async (req, res) => {
  try {
    const dominio = await Dominio.find({})

    res.status(200).json(dominio)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

dominioCtrl.getDominio = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const dominio = await Dominio.findById(id)
    if (dominio) {
      res.status(200).json(dominio)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

dominioCtrl.updateDominio = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    codigoDominio,
    nombreDominio,
    descripcionDominio,
    estatusDominio,
    creadoDominio,
    modificadoDominio
  } = req.body

  try {
    const updateDominio = await Dominio.findByIdAndUpdate(
      id,
      {
        codigoDominio,
        nombreDominio,
        descripcionDominio,
        estatusDominio,
        creadoDominio,
        modificadoDominio
      },
      { new: true }
    )

    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateDominio,
      message: 'Dominio Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

dominioCtrl.deleteDominio = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Dominio.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Dominio Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = dominioCtrl

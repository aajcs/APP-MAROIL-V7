const itemsProformaCtrl = {}

const ItemsProforma = require('../models/ItemsProformaModels')

itemsProformaCtrl.createItemsProforma = async (req, res) => {
  const {
    codigoItemsProforma,
    descripcionItemsProforma,
    usoFondoItemsProforma,
    fechaInicioItemsProforma,
    fechaFinItemsProforma,
    unidadItemsProforma,
    cantidadItemsProforma,
    precioUnitarioItemsProforma,
    precioTotalItemsProforma,
    estatus1ItemsProforma,
    estatus2ItemsProforma,
    creadoItemsProforma,
    modificadoItemsProforma,
    proformaId
  } = req.body
  try {
    const newItemsProforma = new ItemsProforma({
      codigoItemsProforma,
      descripcionItemsProforma,
      usoFondoItemsProforma,
      fechaInicioItemsProforma,
      fechaFinItemsProforma,
      unidadItemsProforma,
      cantidadItemsProforma,
      precioUnitarioItemsProforma,
      precioTotalItemsProforma,
      estatus1ItemsProforma,
      estatus2ItemsProforma,
      creadoItemsProforma,
      modificadoItemsProforma,
      proformaId
    })
    const saveItemsProforma1 = await newItemsProforma.save()

    const saveItemsProforma = await ItemsProforma.findById(
      saveItemsProforma1.id
    ).populate('proformaId', {
      codigoProforma: 1
    })

    if (saveItemsProforma) {
      res.status(200).json({
        saveItemsProforma,
        message: 'Nuevo ItemsProforma Agregado.'
      })
    } else {
      res.status(404).end()
    }

    // console.log(saveItemsProforma)
    // res.status(200).json({
    //   saveItemsProforma,
    //   message: 'Nuevo ItemsProforma Agregado.'
    // })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

itemsProformaCtrl.getItemsProformas = async (req, res) => {
  try {
    const itemsProforma = await ItemsProforma.find({}).populate('proformaId', {
      codigoProforma: 1
    })

    res.status(200).json(itemsProforma)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

itemsProformaCtrl.getItemsProforma = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const itemsProforma = await ItemsProforma.findById(id)
    if (itemsProforma) {
      res.status(200).json(itemsProforma)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

itemsProformaCtrl.updateItemsProforma = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    codigoItemsProforma,
    descripcionItemsProforma,
    usoFondoItemsProforma,
    fechaInicioItemsProforma,
    fechaFinItemsProforma,
    unidadItemsProforma,
    cantidadItemsProforma,
    precioUnitarioItemsProforma,
    precioTotalItemsProforma,
    estatus1ItemsProforma,
    estatus2ItemsProforma,
    creadoItemsProforma,
    modificadoItemsProforma,
    proformaId
  } = req.body

  try {
    const updateItemsProforma = await ItemsProforma.findByIdAndUpdate(
      id,
      {
        codigoItemsProforma,
        descripcionItemsProforma,
        usoFondoItemsProforma,
        fechaInicioItemsProforma,
        fechaFinItemsProforma,
        unidadItemsProforma,
        cantidadItemsProforma,
        precioUnitarioItemsProforma,
        precioTotalItemsProforma,
        estatus1ItemsProforma,
        estatus2ItemsProforma,
        creadoItemsProforma,
        modificadoItemsProforma,
        proformaId
      },
      { new: true }
    ).populate('proformaId', {
      codigoProforma: 1
    })

    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateItemsProforma,
      message: 'ItemsProforma Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

itemsProformaCtrl.deleteItemsProforma = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await ItemsProforma.findByIdAndDelete(id)
    res.status(200).json({
      message: 'ItemsProforma Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = itemsProformaCtrl

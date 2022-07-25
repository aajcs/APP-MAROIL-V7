const facturaCtrl = {}

const Factura = require('../models/FacturaModels')

facturaCtrl.createFactura = async (req, res) => {
  const {
    fechaFactura,
    fechaUltimoPagoFactura,
    codigoFactura,
    proveedorId,
    facturaProformaFactura,
    conceptoFactura,
    tipoFactura,
    procesoAuxId,
    montoFactura,
    abonoFactura,
    saldoFactura,
    estatusFactura,
    userCreatorId,
    facturaCreado,
    facturaModificado
  } = req.body
  try {
    const newFactura = new Factura({
      fechaFactura,
      fechaUltimoPagoFactura,
      codigoFactura,
      proveedorId,
      facturaProformaFactura,
      conceptoFactura,
      tipoFactura,
      procesoAuxId,
      montoFactura,
      abonoFactura,
      saldoFactura,
      estatusFactura,
      userCreatorId,
      facturaCreado,
      facturaModificado
    })
    const saveFactura = await newFactura.save()

    res.status(200).json({
      saveFactura,
      message: 'Nuevo Factura Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

facturaCtrl.getFacturas = async (req, res) => {
  try {
    const factura = await Factura.find({})
    res.status(200).json(factura)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

facturaCtrl.getFactura = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const factura = await Factura.findById(id)
    if (factura) {
      res.status(200).json(factura)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

facturaCtrl.updateFactura = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    fechaFactura,
    fechaUltimoPagoFactura,
    codigoFactura,
    proveedorId,
    facturaProformaFactura,
    conceptoFactura,
    tipoFactura,
    procesoAuxId,
    montoFactura,
    abonoFactura,
    saldoFactura,
    estatusFactura,
    userCreatorId,
    facturaCreado,
    facturaModificado
  } = req.body

  try {
    const updateFactura = await Factura.findByIdAndUpdate(
      id,
      {
        fechaFactura,
        fechaUltimoPagoFactura,
        codigoFactura,
        proveedorId,
        facturaProformaFactura,
        conceptoFactura,
        tipoFactura,
        procesoAuxId,
        montoFactura,
        abonoFactura,
        saldoFactura,
        estatusFactura,
        userCreatorId,
        facturaCreado,
        facturaModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateFactura,
      message: 'Factura Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

facturaCtrl.deleteFactura = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Factura.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Factura Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = facturaCtrl

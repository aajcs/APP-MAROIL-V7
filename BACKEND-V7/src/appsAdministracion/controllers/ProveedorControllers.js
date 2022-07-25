const proveedorCtrl = {}

const Proveedor = require('../models/ProveedorModels')

proveedorCtrl.createProveedor = async (req, res) => {
  const {
    codigoProveedor,
    nombreProveedor,
    rifProveedor,
    direccionProveedor,
    contactoProveedor,
    montoDeudaProveedor,
    montoPagadoProveedor,
    saldoTotalProveedor,
    estatusProveedor,
    inventarioId,
    userCreatorId,
    proveedorCreado,
    proveedorModificado
  } = req.body
  try {
    const newProveedor = new Proveedor({
      codigoProveedor,
      nombreProveedor,
      rifProveedor,
      direccionProveedor,
      contactoProveedor,
      montoDeudaProveedor,
      montoPagadoProveedor,
      saldoTotalProveedor,
      estatusProveedor,
      inventarioId,
      userCreatorId,
      proveedorCreado,
      proveedorModificado
    })
    const saveProveedor = await newProveedor.save()

    res.status(200).json({
      saveProveedor,
      message: 'Nuevo Proveedor Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

proveedorCtrl.getProveedors = async (req, res) => {
  try {
    const proveedor = await Proveedor.find({})
    res.status(200).json(proveedor)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

proveedorCtrl.getProveedor = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const proveedor = await Proveedor.findById(id)
    if (proveedor) {
      res.status(200).json(proveedor)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

proveedorCtrl.updateProveedor = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    codigoProveedor,
    nombreProveedor,
    rifProveedor,
    direccionProveedor,
    contactoProveedor,
    montoDeudaProveedor,
    montoPagadoProveedor,
    saldoTotalProveedor,
    estatusProveedor,
    inventarioId,
    userCreatorId,
    proveedorCreado,
    proveedorModificado
  } = req.body

  try {
    const updateProveedor = await Proveedor.findByIdAndUpdate(
      id,
      {
        codigoProveedor,
        nombreProveedor,
        rifProveedor,
        direccionProveedor,
        contactoProveedor,
        montoDeudaProveedor,
        montoPagadoProveedor,
        saldoTotalProveedor,
        estatusProveedor,
        inventarioId,
        userCreatorId,
        proveedorCreado,
        proveedorModificado
      },
      { new: true }
    )
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateProveedor,
      message: 'Proveedor Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

proveedorCtrl.deleteProveedor = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Proveedor.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Proveedor Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = proveedorCtrl

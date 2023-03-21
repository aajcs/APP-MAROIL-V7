const cajaChicarCtrl = {}

const CajaChica = require('../models/CajaChicaModels')

cajaChicarCtrl.createCajaChica = async (req, res) => {
  const {
    codigoCajaChica,
    descripcionCajaChica,
    ingresoMontoCajaChica,
    egresoMontoCajaChica,
    fechaEfectivaCajaChica,
    saldoTotalCajaChica,
    estatusCajaChica,
    montoEntregadoCajaChica,
    montoVueltoCajaChica,
    estatusVueltoCajaChica,
    proveedorId,
    centroDeCostoAuxId,
    conceptoAuxId,
    creadoCajaChica,
    modificadoCajaChica
  } = req.body
  try {
    const newCajaChica = new CajaChica({
      codigoCajaChica,
      descripcionCajaChica,
      ingresoMontoCajaChica,
      egresoMontoCajaChica,
      fechaEfectivaCajaChica,
      saldoTotalCajaChica,
      estatusCajaChica,
      montoEntregadoCajaChica,
      montoVueltoCajaChica,
      estatusVueltoCajaChica,
      proveedorId,
      centroDeCostoAuxId,
      conceptoAuxId,
      creadoCajaChica,
      modificadoCajaChica
    })

    const saveCajaChica1 = await newCajaChica.save()

    const saveCajaChica = await CajaChica.findById(saveCajaChica1.id)
      .populate('proveedorId', {
        nombreProveedor: 1,
        rifProveedor: 1
      })
      .populate('centroDeCostoAuxId', {
        nombreCentroDeCosto: 1,
        descripcionCentroDeCosto: 1
      })
      .populate('conceptoAuxId', {
        nombreConceptoAux: 1
      })

    res.status(200).json({
      saveCajaChica,
      message: 'Nuevo CajaChica Agregado.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

cajaChicarCtrl.getCajaChicas = async (req, res) => {
  try {
    const cajaChicar = await CajaChica.find({})
      .populate('proveedorId', {
        nombreProveedor: 1,
        rifProveedor: 1
      })
      .populate('centroDeCostoAuxId', {
        nombreCentroDeCosto: 1,
        descripcionCentroDeCosto: 1
      })
      .populate('conceptoAuxId', {
        nombreConceptoAux: 1
      })
    res.status(200).json(cajaChicar)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

cajaChicarCtrl.getCajaChica = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const cajaChicar = await CajaChica.findById(id)
    if (cajaChicar) {
      res.status(200).json(cajaChicar)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

cajaChicarCtrl.updateCajaChica = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    codigoCajaChica,
    descripcionCajaChica,
    ingresoMontoCajaChica,
    egresoMontoCajaChica,
    fechaEfectivaCajaChica,
    saldoTotalCajaChica,
    estatusCajaChica,
    montoEntregadoCajaChica,
    montoVueltoCajaChica,
    estatusVueltoCajaChica,
    proveedorId,
    centroDeCostoAuxId,
    conceptoAuxId,
    creadoCajaChica,
    modificadoCajaChica
  } = req.body

  try {
    const updateCajaChica = await CajaChica.findByIdAndUpdate(
      id,
      {
        codigoCajaChica,
        descripcionCajaChica,
        ingresoMontoCajaChica,
        egresoMontoCajaChica,
        fechaEfectivaCajaChica,
        saldoTotalCajaChica,
        estatusCajaChica,
        montoEntregadoCajaChica,
        montoVueltoCajaChica,
        estatusVueltoCajaChica,
        proveedorId,
        centroDeCostoAuxId,
        conceptoAuxId,
        creadoCajaChica,
        modificadoCajaChica
      },
      { new: true }
    )
      .populate('proveedorId', {
        nombreProveedor: 1,
        rifProveedor: 1
      })
      .populate('centroDeCostoAuxId', {
        nombreCentroDeCosto: 1,
        descripcionCentroDeCosto: 1
      })
      .populate('conceptoAuxId', {
        nombreConceptoAux: 1
      })
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateCajaChica,
      message: 'CajaChica Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

cajaChicarCtrl.deleteCajaChica = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await CajaChica.findByIdAndDelete(id)
    res.status(200).json({
      message: 'CajaChica Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = cajaChicarCtrl

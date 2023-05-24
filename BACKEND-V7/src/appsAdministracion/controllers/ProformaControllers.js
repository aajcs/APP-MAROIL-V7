const proformaCtrl = {}

const Proforma = require('../models/ProformaModels')

proformaCtrl.createProforma = async (req, res) => {
  const {
    codigoProforma,
    proveedorId,
    numeroControlProforma,
    fechaControlProforma,
    dominioId,
    divisionId,
    dependenciaId,
    subDependenciaId,
    actividadAsociadaId,
    clasificacionServicioId,
    ingresoProforma,
    egresoProforma,
    totalProforma,
    descripcionProforma,
    estatusProforma,
    userCreatorId,
    creadoProforma,
    modificadoProforma
  } = req.body
  try {
    const newProforma = new Proforma({
      codigoProforma,
      proveedorId,
      numeroControlProforma,
      fechaControlProforma,
      dominioId,
      divisionId,
      dependenciaId,
      subDependenciaId,
      actividadAsociadaId,
      clasificacionServicioId,
      ingresoProforma,
      egresoProforma,
      totalProforma,
      descripcionProforma,
      estatusProforma,
      userCreatorId,
      creadoProforma,
      modificadoProforma
    })
    const saveProforma1 = await newProforma.save()

    const saveProforma = await Proforma.findById(saveProforma1.id)
      .populate('proveedorId', {
        nombreProveedor: 1
      })
      .populate('dominioId', {
        nombreDominio: 1
      })
      .populate('divisionId', {
        nombreDivision: 1
      })
      .populate('dependenciaId', {
        nombreDependencia: 1
      })
      .populate('subDependenciaId', {
        nombreSubDependencia: 1
      })
      .populate('actividadAsociadaId', {
        nombreActividadAsociada: 1
      })
      .populate('clasificacionServicioId', {
        nombreClasificacionServicio: 1
      })
    if (saveProforma) {
      res.status(200).json({
        saveProforma,
        message: 'Nuevo Proforma Agregado.'
      })
    } else {
      res.status(404).end()
    }

    // console.log(saveProforma)
    // res.status(200).json({
    //   saveProforma,
    //   message: 'Nuevo Proforma Agregado.'
    // })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

proformaCtrl.getProformas = async (req, res) => {
  try {
    const proforma = await Proforma.find({})
      .populate('proveedorId', {
        nombreProveedor: 1
      })
      .populate('dominioId', {
        nombreDominio: 1
      })
      .populate('divisionId', {
        nombreDivision: 1
      })
      .populate('dependenciaId', {
        nombreDependencia: 1
      })
      .populate('subDependenciaId', {
        nombreSubDependencia: 1
      })
      .populate('actividadAsociadaId', {
        nombreActividadAsociada: 1
      })
      .populate('clasificacionServicioId', {
        nombreClasificacionServicio: 1
      })
    res.status(200).json(proforma)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

proformaCtrl.getProforma = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const proforma = await Proforma.findById(id)
    if (proforma) {
      res.status(200).json(proforma)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

proformaCtrl.updateProforma = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    codigoProforma,
    proveedorId,
    numeroControlProforma,
    fechaControlProforma,
    dominioId,
    divisionId,
    dependenciaId,
    subDependenciaId,
    actividadAsociadaId,
    clasificacionServicioId,
    ingresoProforma,
    egresoProforma,
    totalProforma,
    descripcionProforma,
    estatusProforma,
    userCreatorId,
    creadoProforma,
    modificadoProforma
  } = req.body

  try {
    const updateProforma = await Proforma.findByIdAndUpdate(
      id,
      {
        codigoProforma,
        proveedorId,
        numeroControlProforma,
        fechaControlProforma,
        dominioId,
        divisionId,
        dependenciaId,
        subDependenciaId,
        actividadAsociadaId,
        clasificacionServicioId,
        ingresoProforma,
        egresoProforma,
        totalProforma,
        descripcionProforma,
        estatusProforma,
        userCreatorId,
        creadoProforma,
        modificadoProforma
      },
      { new: true }
    )
      .populate('proveedorId', {
        nombreProveedor: 1
      })
      .populate('dominioId', {
        nombreDominio: 1
      })
      .populate('divisionId', {
        nombreDivision: 1
      })
      .populate('dependenciaId', {
        nombreDependencia: 1
      })
      .populate('subDependenciaId', {
        nombreSubDependencia: 1
      })
      .populate('actividadAsociadaId', {
        nombreActividadAsociada: 1
      })
      .populate('clasificacionServicioId', {
        nombreClasificacionServicio: 1
      })
    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateProforma,
      message: 'Proforma Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

proformaCtrl.deleteProforma = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Proforma.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Proforma Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = proformaCtrl

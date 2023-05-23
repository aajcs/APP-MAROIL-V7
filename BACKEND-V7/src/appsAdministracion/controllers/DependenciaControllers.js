const dependenciaCtrl = {}

const Dependencia = require('../models/DependenciaModels')

dependenciaCtrl.createDependencia = async (req, res) => {
  const {
    codigoDependencia,
    nombreDependencia,
    descripcionDependencia,
    estatusDependencia,
    creadoDependencia,
    modificadoDependencia
  } = req.body
  try {
    const newDependencia = new Dependencia({
      codigoDependencia,
      nombreDependencia,
      descripcionDependencia,
      estatusDependencia,
      creadoDependencia,
      modificadoDependencia
    })
    const saveDependencia1 = await newDependencia.save()

    const saveDependencia = await Dependencia.findById(
      saveDependencia1.id
    ).populate('divisionId', {
      nombreDivision: 1
    })

    if (saveDependencia) {
      res.status(200).json({
        saveDependencia,
        message: 'Nuevo Dependencia Agregado.'
      })
    } else {
      res.status(404).end()
    }

    // console.log(saveDependencia)
    // res.status(200).json({
    //   saveDependencia,
    //   message: 'Nuevo Dependencia Agregado.'
    // })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

dependenciaCtrl.getDependencias = async (req, res) => {
  try {
    const dependencia = await Dependencia.find({}).populate('divisionId', {
      nombreDivision: 1
    })
    res.status(200).json(dependencia)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

dependenciaCtrl.getDependencia = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const dependencia = await Dependencia.findById(id)
    if (dependencia) {
      res.status(200).json(dependencia)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

dependenciaCtrl.updateDependencia = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    codigoDependencia,
    nombreDependencia,
    descripcionDependencia,
    estatusDependencia,
    creadoDependencia,
    modificadoDependencia
  } = req.body

  try {
    const updateDependencia = await Dependencia.findByIdAndUpdate(
      id,
      {
        codigoDependencia,
        nombreDependencia,
        descripcionDependencia,
        estatusDependencia,
        creadoDependencia,
        modificadoDependencia
      },
      { new: true }
    ).populate('divisionId', {
      nombreDivision: 1
    })

    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateDependencia,
      message: 'Dependencia Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

dependenciaCtrl.deleteDependencia = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Dependencia.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Dependencia Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = dependenciaCtrl

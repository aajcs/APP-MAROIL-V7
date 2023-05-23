const subDependenciaCtrl = {}

const SubDependencia = require('../models/SubDependenciaModels')

subDependenciaCtrl.createSubDependencia = async (req, res) => {
  const {
    codigoSubDependencia,
    nombreSubDependencia,
    descripcionSubDependencia,
    estatusSubDependencia,
    creadoSubDependencia,
    modificadoSubDependencia
  } = req.body
  try {
    const newSubDependencia = new SubDependencia({
      codigoSubDependencia,
      nombreSubDependencia,
      descripcionSubDependencia,
      estatusSubDependencia,
      creadoSubDependencia,
      modificadoSubDependencia
    })
    const saveSubDependencia1 = await newSubDependencia.save()

    const saveSubDependencia = await SubDependencia.findById(
      saveSubDependencia1.id
    ).populate('dependenciaId', {
      nombreDependencia: 1
    })

    if (saveSubDependencia) {
      res.status(200).json({
        saveSubDependencia,
        message: 'Nuevo SubDependencia Agregado.'
      })
    } else {
      res.status(404).end()
    }

    // console.log(saveSubDependencia)
    // res.status(200).json({
    //   saveSubDependencia,
    //   message: 'Nuevo SubDependencia Agregado.'
    // })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

subDependenciaCtrl.getSubDependencias = async (req, res) => {
  try {
    const subDependencia = await SubDependencia.find({}).populate(
      'dependenciaId',
      {
        nombreDependencia: 1
      }
    )

    res.status(200).json(subDependencia)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

subDependenciaCtrl.getSubDependencia = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const subDependencia = await SubDependencia.findById(id)
    if (subDependencia) {
      res.status(200).json(subDependencia)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

subDependenciaCtrl.updateSubDependencia = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    codigoSubDependencia,
    nombreSubDependencia,
    descripcionSubDependencia,
    estatusSubDependencia,
    creadoSubDependencia,
    modificadoSubDependencia
  } = req.body

  try {
    const updateSubDependencia = await SubDependencia.findByIdAndUpdate(
      id,
      {
        codigoSubDependencia,
        nombreSubDependencia,
        descripcionSubDependencia,
        estatusSubDependencia,
        creadoSubDependencia,
        modificadoSubDependencia
      },
      { new: true }
    ).populate('dependenciaId', {
      nombreDependencia: 1
    })

    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateSubDependencia,
      message: 'SubDependencia Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

subDependenciaCtrl.deleteSubDependencia = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await SubDependencia.findByIdAndDelete(id)
    res.status(200).json({
      message: 'SubDependencia Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = subDependenciaCtrl

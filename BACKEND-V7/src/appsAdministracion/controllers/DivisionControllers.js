const divisionCtrl = {}

const Division = require('../models/DivisionModels')

divisionCtrl.createDivision = async (req, res) => {
  const {
    codigoDivision,
    nombreDivision,
    descripcionDivision,
    estatusDivision,
    creadoDivision,
    modificadoDivision,
    dominioId
  } = req.body
  try {
    const newDivision = new Division({
      codigoDivision,
      nombreDivision,
      descripcionDivision,
      estatusDivision,
      creadoDivision,
      modificadoDivision,
      dominioId
    })
    const saveDivision1 = await newDivision.save()

    const saveDivision = await Division.findById(saveDivision1.id).populate(
      'dominioId',
      {
        nombreDominio: 1
      }
    )

    if (saveDivision) {
      res.status(200).json({
        saveDivision,
        message: 'Nuevo Division Agregado.'
      })
    } else {
      res.status(404).end()
    }

    // console.log(saveDivision)
    // res.status(200).json({
    //   saveDivision,
    //   message: 'Nuevo Division Agregado.'
    // })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

divisionCtrl.getDivisions = async (req, res) => {
  try {
    const division = await Division.find({}).populate('dominioId', {
      nombreDominio: 1
    })

    res.status(200).json(division)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

divisionCtrl.getDivision = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    const division = await Division.findById(id)
    if (division) {
      res.status(200).json(division)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

divisionCtrl.updateDivision = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  const {
    codigoDivision,
    nombreDivision,
    descripcionDivision,
    estatusDivision,
    creadoDivision,
    modificadoDivision,
    dominioId
  } = req.body

  try {
    const updateDivision = await Division.findByIdAndUpdate(
      id,
      {
        codigoDivision,
        nombreDivision,
        descripcionDivision,
        estatusDivision,
        creadoDivision,
        modificadoDivision,
        dominioId
      },
      { new: true }
    ).populate('dominioId', {
      nombreDominio: 1
    })

    // VERIFICAR QUE UPDATE NO SEA NULL
    res.status(200).json({
      updateDivision,
      message: 'Division Actualizado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

divisionCtrl.deleteDivision = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: 'requiere el "ID"'
    })
  }
  try {
    await Division.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Division Eliminado de Manera Exitosa.'
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports = divisionCtrl

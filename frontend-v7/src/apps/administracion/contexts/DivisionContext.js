/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { DivisionService } from '../services/DivisionService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const DivisionContext = createContext()

const DivisionContextProvider = (props) => {
  const divisionService = new DivisionService()
  // const cargaBodegaService = new CargaBodegaService()

  const [divisions, setDivisions] = useState([])
  const [createBodegaDivision1, setCreateBodegaDivision1] = useState([])
  const [divisioncargando, setDivisioncargando] = useState(null)
  const [editDivision, setEditDivision] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    divisionService.readAll(token).then((data) => {
      setDivisions(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      divisionService.readAll(token).then((data) => {
        setDivisions(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const division = divisions.find((p) => p.estatusDivision === 'OPERATIVO')
    setDivisioncargando(division)
  }, [divisions])

  const findDivision = (id) => {
    const division = divisions.find((p) => p.id === id)
    setEditDivision(division)
  }

  const createDivision = (division) => {
    divisionService.create(division, token).then((data) => {
      setDivisions([...divisions, data.saveDivision])
      createBodegaDivision(data.saveDivision)
      setCreateBodegaDivision1(data.saveDivision)
    })
  }
  const createBodegaDivision = (saveDivision) => {
    const cargaBodega = {
      divisionID: saveDivision.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveDivision.cantidadBodegas)
    for (let i = 1; i <= saveDivision.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // divisionService.create(CargaBodega, token).then((data) => {
    //   setDivisions([...divisions, data.saveDivision])
    //   console.log('division creado', data.saveDivision)
    // })
  }

  const updateDivision = (division) => {
    divisionService
      .update(division, token)
      .then((data) =>
        setDivisions(
          divisions.map((p) => (p.id === division.id ? data.updateDivision : p))
        )
      )
    setEditDivision(null)
  }
  const deleteDivision = (id) => {
    divisionService
      .delete(id, token)
      .then(() => setDivisions(divisions.filter((p) => p.id !== id)))
  }

  return (
    <DivisionContext.Provider
      value={{
        findDivision,
        createDivision,
        updateDivision,
        deleteDivision,
        editDivision,
        divisioncargando,
        divisions,
        loading,
        createBodegaDivision1
      }}
    >
      {props.children}
    </DivisionContext.Provider>
  )
}

export default DivisionContextProvider

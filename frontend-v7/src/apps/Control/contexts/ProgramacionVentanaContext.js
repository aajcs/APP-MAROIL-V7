/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { ProgramacionVentanaService } from '../services/ProgramacionVentanaService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const ProgramacionVentanaContext = createContext()

const ProgramacionVentanaContextProvider = (props) => {
  const programacionVentanaService = new ProgramacionVentanaService()
  // const cargaBodegaService = new CargaBodegaService()

  const [programacionVentanas, setProgramacionVentanas] = useState([])
  const [
    createBodegaProgramacionVentana1,
    setCreateBodegaProgramacionVentana1
  ] = useState([])
  const [programacionVentanacargando, setprogramacionVentanacargando] =
    useState(null)
  const [editProgramacionVentana, setEditProgramacionVentana] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    programacionVentanaService.readAll(token).then((data) => {
      setProgramacionVentanas(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      programacionVentanaService.readAll(token).then((data) => {
        setProgramacionVentanas(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const programacionVentana = programacionVentanas.find(
      (p) => p.estatusProgramacionVentana === 'OPERATIVO'
    )
    setprogramacionVentanacargando(programacionVentana)
  }, [programacionVentanas])

  const findProgramacionVentana = (id) => {
    const programacionVentana = programacionVentanas.find((p) => p.id === id)
    setEditProgramacionVentana(programacionVentana)
  }

  const createProgramacionVentana = (programacionVentana) => {
    programacionVentanaService
      .create(programacionVentana, token)
      .then((data) => {
        setProgramacionVentanas([
          ...programacionVentanas,
          data.saveProgramacionVentana
        ])
        createBodegaProgramacionVentana(data.saveProgramacionVentana)
        setCreateBodegaProgramacionVentana1(data.saveProgramacionVentana)
      })
  }
  const createBodegaProgramacionVentana = (saveProgramacionVentana) => {
    const cargaBodega = {
      programacionVentanaID: saveProgramacionVentana.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveProgramacionVentana.cantidadBodegas)
    for (let i = 1; i <= saveProgramacionVentana.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // programacionVentanaService.create(CargaBodega, token).then((data) => {
    //   setProgramacionVentanas([...programacionVentanas, data.saveProgramacionVentana])
    //   console.log('programacionVentana creado', data.saveProgramacionVentana)
    // })
  }

  const updateProgramacionVentana = (programacionVentana) => {
    programacionVentanaService
      .update(programacionVentana, token)
      .then((data) =>
        setProgramacionVentanas(
          programacionVentanas.map((p) =>
            p.id === programacionVentana.id ? data.updateProgramacionVentana : p
          )
        )
      )
    setEditProgramacionVentana(null)
  }
  const deleteProgramacionVentana = (id) => {
    programacionVentanaService
      .delete(id, token)
      .then(() =>
        setProgramacionVentanas(programacionVentanas.filter((p) => p.id !== id))
      )
  }

  return (
    <ProgramacionVentanaContext.Provider
      value={{
        findProgramacionVentana,
        createProgramacionVentana,
        updateProgramacionVentana,
        deleteProgramacionVentana,
        editProgramacionVentana,
        programacionVentanacargando,
        programacionVentanas,
        loading,
        createBodegaProgramacionVentana1
      }}
    >
      {props.children}
    </ProgramacionVentanaContext.Provider>
  )
}

export default ProgramacionVentanaContextProvider

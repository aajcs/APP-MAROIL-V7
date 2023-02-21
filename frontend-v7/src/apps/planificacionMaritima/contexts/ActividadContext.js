/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { ActividadService } from '../services/ActividadService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const ActividadContext = createContext()

const ActividadContextProvider = (props) => {
  const actividadService = new ActividadService()
  // const cargaBodegaService = new CargaBodegaService()

  const [actividads, setActividads] = useState([])
  const [createBodegaActividad1, setCreateBodegaActividad1] = useState([])
  const [actividadcargando, setActividadcargando] = useState(null)
  const [editActividad, setEditActividad] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    actividadService.readAll(token).then((data) => {
      setActividads(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      actividadService.readAll(token).then((data) => {
        setActividads(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const actividad = actividads.find((p) => p.estatusActividad === 'OPERATIVO')
    setActividadcargando(actividad)
  }, [actividads])

  const findActividad = (id) => {
    const actividad = actividads.find((p) => p.id === id)
    setEditActividad(actividad)
  }

  const createActividad = (actividad) => {
    actividadService.create(actividad, token).then((data) => {
      setActividads([...actividads, data.saveActividad])
      createBodegaActividad(data.saveActividad)
      setCreateBodegaActividad1(data.saveActividad)
    })
  }
  const createBodegaActividad = (saveActividad) => {
    const cargaBodega = {
      actividadID: saveActividad.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveActividad.cantidadBodegas)
    for (let i = 1; i <= saveActividad.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // actividadService.create(CargaBodega, token).then((data) => {
    //   setActividads([...actividads, data.saveActividad])
    //   console.log('actividad creado', data.saveActividad)
    // })
  }

  const updateActividad = (actividad) => {
    actividadService
      .update(actividad, token)
      .then((data) =>
        setActividads(
          actividads.map((p) =>
            p.id === actividad.id ? data.updateActividad : p
          )
        )
      )
    setEditActividad(null)
  }
  const deleteActividad = (id) => {
    actividadService
      .delete(id, token)
      .then(() => setActividads(actividads.filter((p) => p.id !== id)))
  }

  return (
    <ActividadContext.Provider
      value={{
        findActividad,
        createActividad,
        updateActividad,
        deleteActividad,
        editActividad,
        actividadcargando,
        actividads,
        loading,
        createBodegaActividad1
      }}
    >
      {props.children}
    </ActividadContext.Provider>
  )
}

export default ActividadContextProvider

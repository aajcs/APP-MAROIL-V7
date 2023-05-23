/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { ActividadAsociadaService } from '../services/ActividadAsociadaService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const ActividadAsociadaContext = createContext()

const ActividadAsociadaContextProvider = (props) => {
  const actividadAsociadaService = new ActividadAsociadaService()
  // const cargaBodegaService = new CargaBodegaService()

  const [actividadAsociadas, setActividadAsociadas] = useState([])
  const [createBodegaActividadAsociada1, setCreateBodegaActividadAsociada1] =
    useState([])
  const [actividadAsociadacargando, setActividadAsociadacargando] =
    useState(null)
  const [editActividadAsociada, setEditActividadAsociada] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    actividadAsociadaService.readAll(token).then((data) => {
      setActividadAsociadas(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      actividadAsociadaService.readAll(token).then((data) => {
        setActividadAsociadas(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const actividadAsociada = actividadAsociadas.find(
      (p) => p.estatusActividadAsociada === 'OPERATIVO'
    )
    setActividadAsociadacargando(actividadAsociada)
  }, [actividadAsociadas])

  const findActividadAsociada = (id) => {
    const actividadAsociada = actividadAsociadas.find((p) => p.id === id)
    setEditActividadAsociada(actividadAsociada)
  }

  const createActividadAsociada = (actividadAsociada) => {
    actividadAsociadaService.create(actividadAsociada, token).then((data) => {
      setActividadAsociadas([...actividadAsociadas, data.saveActividadAsociada])
      createBodegaActividadAsociada(data.saveActividadAsociada)
      setCreateBodegaActividadAsociada1(data.saveActividadAsociada)
    })
  }
  const createBodegaActividadAsociada = (saveActividadAsociada) => {
    const cargaBodega = {
      actividadAsociadaID: saveActividadAsociada.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveActividadAsociada.cantidadBodegas)
    for (let i = 1; i <= saveActividadAsociada.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // actividadAsociadaService.create(CargaBodega, token).then((data) => {
    //   setActividadAsociadas([...actividadAsociadas, data.saveActividadAsociada])
    //   console.log('actividadAsociada creado', data.saveActividadAsociada)
    // })
  }

  const updateActividadAsociada = (actividadAsociada) => {
    actividadAsociadaService
      .update(actividadAsociada, token)
      .then((data) =>
        setActividadAsociadas(
          actividadAsociadas.map((p) =>
            p.id === actividadAsociada.id ? data.updateActividadAsociada : p
          )
        )
      )
    setEditActividadAsociada(null)
  }
  const deleteActividadAsociada = (id) => {
    actividadAsociadaService
      .delete(id, token)
      .then(() =>
        setActividadAsociadas(actividadAsociadas.filter((p) => p.id !== id))
      )
  }

  return (
    <ActividadAsociadaContext.Provider
      value={{
        findActividadAsociada,
        createActividadAsociada,
        updateActividadAsociada,
        deleteActividadAsociada,
        editActividadAsociada,
        actividadAsociadacargando,
        actividadAsociadas,
        loading,
        createBodegaActividadAsociada1
      }}
    >
      {props.children}
    </ActividadAsociadaContext.Provider>
  )
}

export default ActividadAsociadaContextProvider

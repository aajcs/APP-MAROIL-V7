/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { ClasificacionServicioService } from '../services/ClasificacionServicioService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const ClasificacionServicioContext = createContext()

const ClasificacionServicioContextProvider = (props) => {
  const clasificacionServicioService = new ClasificacionServicioService()
  // const cargaBodegaService = new CargaBodegaService()

  const [clasificacionServicios, setClasificacionServicios] = useState([])
  const [
    createBodegaClasificacionServicio1,
    setCreateBodegaClasificacionServicio1
  ] = useState([])
  const [clasificacionServiciocargando, setClasificacionServiciocargando] =
    useState(null)
  const [editClasificacionServicio, setEditClasificacionServicio] =
    useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    clasificacionServicioService.readAll(token).then((data) => {
      setClasificacionServicios(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      clasificacionServicioService.readAll(token).then((data) => {
        setClasificacionServicios(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const clasificacionServicio = clasificacionServicios.find(
      (p) => p.estatusClasificacionServicio === 'OPERATIVO'
    )
    setClasificacionServiciocargando(clasificacionServicio)
  }, [clasificacionServicios])

  const findClasificacionServicio = (id) => {
    const clasificacionServicio = clasificacionServicios.find(
      (p) => p.id === id
    )
    setEditClasificacionServicio(clasificacionServicio)
  }

  const createClasificacionServicio = (clasificacionServicio) => {
    clasificacionServicioService
      .create(clasificacionServicio, token)
      .then((data) => {
        setClasificacionServicios([
          ...clasificacionServicios,
          data.saveClasificacionServicio
        ])
        createBodegaClasificacionServicio(data.saveClasificacionServicio)
        setCreateBodegaClasificacionServicio1(data.saveClasificacionServicio)
      })
  }
  const createBodegaClasificacionServicio = (saveClasificacionServicio) => {
    const cargaBodega = {
      clasificacionServicioID: saveClasificacionServicio.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveClasificacionServicio.cantidadBodegas)
    for (let i = 1; i <= saveClasificacionServicio.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // clasificacionServicioService.create(CargaBodega, token).then((data) => {
    //   setClasificacionServicios([...clasificacionServicios, data.saveClasificacionServicio])
    //   console.log('clasificacionServicio creado', data.saveClasificacionServicio)
    // })
  }

  const updateClasificacionServicio = (clasificacionServicio) => {
    clasificacionServicioService
      .update(clasificacionServicio, token)
      .then((data) =>
        setClasificacionServicios(
          clasificacionServicios.map((p) =>
            p.id === clasificacionServicio.id
              ? data.updateClasificacionServicio
              : p
          )
        )
      )
    setEditClasificacionServicio(null)
  }
  const deleteClasificacionServicio = (id) => {
    clasificacionServicioService
      .delete(id, token)
      .then(() =>
        setClasificacionServicios(
          clasificacionServicios.filter((p) => p.id !== id)
        )
      )
  }

  return (
    <ClasificacionServicioContext.Provider
      value={{
        findClasificacionServicio,
        createClasificacionServicio,
        updateClasificacionServicio,
        deleteClasificacionServicio,
        editClasificacionServicio,
        clasificacionServiciocargando,
        clasificacionServicios,
        loading,
        createBodegaClasificacionServicio1
      }}
    >
      {props.children}
    </ClasificacionServicioContext.Provider>
  )
}

export default ClasificacionServicioContextProvider

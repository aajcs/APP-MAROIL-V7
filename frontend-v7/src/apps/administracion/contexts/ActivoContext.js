/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { ActivoService } from '../services/ActivoService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const ActivoContext = createContext()

const ActivoContextProvider = (props) => {
  const activoService = new ActivoService()
  // const cargaBodegaService = new CargaBodegaService()

  const [activos, setActivos] = useState([])
  const [createBodegaActivo1, setCreateBodegaActivo1] = useState([])
  const [activocargando, setActivocargando] = useState(null)
  const [editActivo, setEditActivo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    activoService.readAll(token).then((data) => {
      setActivos(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      activoService.readAll(token).then((data) => {
        setActivos(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const activo = activos.find((p) => p.estatusActivo === 'OPERATIVO')
    setActivocargando(activo)
  }, [activos])

  const findActivo = (id) => {
    const activo = activos.find((p) => p.id === id)
    setEditActivo(activo)
  }

  const createActivo = (activo) => {
    activoService.create(activo, token).then((data) => {
      setActivos([...activos, data.saveActivo])
      createBodegaActivo(data.saveActivo)
      setCreateBodegaActivo1(data.saveActivo)
    })
  }
  const createBodegaActivo = (saveActivo) => {
    const cargaBodega = {
      activoID: saveActivo.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveActivo.cantidadBodegas)
    for (let i = 1; i <= saveActivo.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // activoService.create(CargaBodega, token).then((data) => {
    //   setActivos([...activos, data.saveActivo])
    //   console.log('activo creado', data.saveActivo)
    // })
  }

  const updateActivo = (activo) => {
    activoService
      .update(activo, token)
      .then((data) =>
        setActivos(
          activos.map((p) => (p.id === activo.id ? data.updateActivo : p))
        )
      )
    setEditActivo(null)
  }
  const deleteActivo = (id) => {
    activoService
      .delete(id, token)
      .then(() => setActivos(activos.filter((p) => p.id !== id)))
  }

  return (
    <ActivoContext.Provider
      value={{
        findActivo,
        createActivo,
        updateActivo,
        deleteActivo,
        editActivo,
        activocargando,
        activos,
        loading,
        createBodegaActivo1
      }}
    >
      {props.children}
    </ActivoContext.Provider>
  )
}

export default ActivoContextProvider

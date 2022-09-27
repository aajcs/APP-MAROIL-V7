/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { CargaViajeService } from '../services/CargaViajeService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const CargaViajeContext = createContext()

const CargaViajeContextProvider = (props) => {
  const cargaViajeService = new CargaViajeService()
  // const cargaBodegaService = new CargaBodegaService()

  const [cargaViajes, setCargaViajes] = useState([])
  const [createBodegaCargaViaje1, setCreateBodegaCargaViaje1] = useState([])
  const [cargaViajecargando, setcargaViajecargando] = useState(null)
  const [editCargaViaje, setEditCargaViaje] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    cargaViajeService.readAll(token).then((data) => {
      setCargaViajes(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      cargaViajeService.readAll(token).then((data) => {
        setCargaViajes(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const cargaViaje = cargaViajes.find(
      (p) => p.estatusCargaViaje === 'OPERATIVO'
    )
    setcargaViajecargando(cargaViaje)
  }, [cargaViajes])

  const findCargaViaje = (id) => {
    const cargaViaje = cargaViajes.find((p) => p.id === id)
    setEditCargaViaje(cargaViaje)
  }

  const createCargaViaje = (cargaViaje) => {
    cargaViajeService.create(cargaViaje, token).then((data) => {
      setCargaViajes([...cargaViajes, data.saveCargaViaje])
      createBodegaCargaViaje(data.saveCargaViaje)
      setCreateBodegaCargaViaje1(data.saveCargaViaje)
    })
  }
  const createBodegaCargaViaje = (saveCargaViaje) => {
    const cargaBodega = {
      cargaViajeID: saveCargaViaje.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveCargaViaje.cantidadBodegas)
    for (let i = 1; i <= saveCargaViaje.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // cargaViajeService.create(CargaBodega, token).then((data) => {
    //   setCargaViajes([...cargaViajes, data.saveCargaViaje])
    //   console.log('cargaViaje creado', data.saveCargaViaje)
    // })
  }

  const updateCargaViaje = (cargaViaje) => {
    cargaViajeService
      .update(cargaViaje, token)
      .then((data) =>
        setCargaViajes(
          cargaViajes.map((p) =>
            p.id === cargaViaje.id ? data.updateCargaViaje : p
          )
        )
      )
    setEditCargaViaje(null)
  }
  const deleteCargaViaje = (id) => {
    cargaViajeService
      .delete(id, token)
      .then(() => setCargaViajes(cargaViajes.filter((p) => p.id !== id)))
  }

  return (
    <CargaViajeContext.Provider
      value={{
        findCargaViaje,
        createCargaViaje,
        updateCargaViaje,
        deleteCargaViaje,
        editCargaViaje,
        cargaViajecargando,
        cargaViajes,
        loading,
        createBodegaCargaViaje1
      }}
    >
      {props.children}
    </CargaViajeContext.Provider>
  )
}

export default CargaViajeContextProvider

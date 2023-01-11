/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { ViajeService } from '../services/ViajeService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const ViajeContext = createContext()

const ViajeContextProvider = (props) => {
  const viajeService = new ViajeService()
  // const cargaBodegaService = new CargaBodegaService()

  const [viajes, setViajes] = useState([])
  const [createBodegaViaje1, setCreateBodegaViaje1] = useState([])
  const [viajecargando, setviajecargando] = useState(null)
  const [editViaje, setEditViaje] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    viajeService.readAll(token).then((data) => {
      setViajes(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      viajeService.readAll(token).then((data) => {
        setViajes(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const viaje = viajes.find((p) => p.estatusViaje === 'OPERATIVO')
    setviajecargando(viaje)
  }, [viajes])

  const findViaje = (id) => {
    const viaje = viajes.find((p) => p.id === id)
    setEditViaje(viaje)
  }

  const createViaje = (viaje) => {
    viajeService.create(viaje, token).then((data) => {
      setViajes([...viajes, data.saveViaje])
      createBodegaViaje(data.saveViaje)
      setCreateBodegaViaje1(data.saveViaje)
    })
  }
  const createBodegaViaje = (saveViaje) => {
    const cargaBodega = {
      viajeID: saveViaje.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveViaje.cantidadBodegas)
    for (let i = 1; i <= saveViaje.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // viajeService.create(CargaBodega, token).then((data) => {
    //   setViajes([...viajes, data.saveViaje])
    //   console.log('viaje creado', data.saveViaje)
    // })
  }

  const updateViaje = (viaje) => {
    viajeService
      .update(viaje, token)
      .then((data) =>
        setViajes(viajes.map((p) => (p.id === viaje.id ? data.updateViaje : p)))
      )
    setEditViaje(null)
  }
  const deleteViaje = (id) => {
    viajeService
      .delete(id, token)
      .then(() => setViajes(viajes.filter((p) => p.id !== id)))
  }

  return (
    <ViajeContext.Provider
      value={{
        findViaje,
        createViaje,
        updateViaje,
        deleteViaje,
        editViaje,
        viajecargando,
        viajes,
        loading,
        createBodegaViaje1
      }}
    >
      {props.children}
    </ViajeContext.Provider>
  )
}

export default ViajeContextProvider

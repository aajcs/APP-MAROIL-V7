/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { BarcoService } from '../services/BarcoService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const BarcoContext = createContext()

const BarcoContextProvider = (props) => {
  const barcoService = new BarcoService()
  // const cargaBodegaService = new CargaBodegaService()

  const [barcos, setBarcos] = useState([])
  const [createBodegaBarco1, setCreateBodegaBarco1] = useState([])
  const [barcocargando, setbarcocargando] = useState(null)
  const [editBarco, setEditBarco] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    barcoService.readAll(token).then((data) => {
      setBarcos(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      barcoService.readAll(token).then((data) => {
        setBarcos(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const barco = barcos.find((p) => p.estatusBarco === 'OPERATIVO')
    setbarcocargando(barco)
  }, [barcos])

  const findBarco = (id) => {
    const barco = barcos.find((p) => p.id === id)
    setEditBarco(barco)
  }

  const createBarco = (barco) => {
    barcoService.create(barco, token).then((data) => {
      setBarcos([...barcos, data.saveBarco])
      createBodegaBarco(data.saveBarco)
      setCreateBodegaBarco1(data.saveBarco)
    })
  }
  const createBodegaBarco = (saveBarco) => {
    const cargaBodega = {
      barcoID: saveBarco.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveBarco.cantidadBodegas)
    for (let i = 1; i <= saveBarco.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // barcoService.create(CargaBodega, token).then((data) => {
    //   setBarcos([...barcos, data.saveBarco])
    //   console.log('barco creado', data.saveBarco)
    // })
  }

  const updateBarco = (barco) => {
    barcoService
      .update(barco, token)
      .then((data) =>
        setBarcos(barcos.map((p) => (p.id === barco.id ? data.updateBarco : p)))
      )
    setEditBarco(null)
  }
  const deleteBarco = (id) => {
    barcoService
      .delete(id, token)
      .then(() => setBarcos(barcos.filter((p) => p.id !== id)))
  }

  return (
    <BarcoContext.Provider
      value={{
        findBarco,
        createBarco,
        updateBarco,
        deleteBarco,
        editBarco,
        barcocargando,
        barcos,
        loading,
        createBodegaBarco1
      }}
    >
      {props.children}
    </BarcoContext.Provider>
  )
}

export default BarcoContextProvider

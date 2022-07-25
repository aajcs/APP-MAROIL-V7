/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { IngresoGastoService } from '../services/IngresoGastoService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const IngresoGastoContext = createContext()

const IngresoGastoContextProvider = (props) => {
  const ingresoGastoService = new IngresoGastoService()
  // const cargaBodegaService = new CargaBodegaService()

  const [ingresoGastos, setIngresoGastos] = useState([])
  const [createBodegaIngresoGasto1, setCreateBodegaIngresoGasto1] = useState([])
  const [ingresoGastocargando, setIngresoGastocargando] = useState(null)
  const [editIngresoGasto, setEditIngresoGasto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    ingresoGastoService.readAll(token).then((data) => {
      setIngresoGastos(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      ingresoGastoService.readAll(token).then((data) => {
        setIngresoGastos(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const ingresoGasto = ingresoGastos.find(
      (p) => p.estatusIngresoGasto === 'OPERATIVO'
    )
    setIngresoGastocargando(ingresoGasto)
  }, [ingresoGastos])

  const findIngresoGasto = (id) => {
    const ingresoGasto = ingresoGastos.find((p) => p.id === id)
    setEditIngresoGasto(ingresoGasto)
  }

  const createIngresoGasto = (ingresoGasto) => {
    ingresoGastoService.create(ingresoGasto, token).then((data) => {
      setIngresoGastos([...ingresoGastos, data.saveIngresoGasto])
      createBodegaIngresoGasto(data.saveIngresoGasto)
      setCreateBodegaIngresoGasto1(data.saveIngresoGasto)
    })
  }
  const createBodegaIngresoGasto = (saveIngresoGasto) => {
    const cargaBodega = {
      ingresoGastoID: saveIngresoGasto.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveIngresoGasto.cantidadBodegas)
    for (let i = 1; i <= saveIngresoGasto.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // ingresoGastoService.create(CargaBodega, token).then((data) => {
    //   setIngresoGastos([...ingresoGastos, data.saveIngresoGasto])
    //   console.log('ingresoGasto creado', data.saveIngresoGasto)
    // })
  }

  const updateIngresoGasto = (ingresoGasto) => {
    ingresoGastoService
      .update(ingresoGasto, token)
      .then((data) =>
        setIngresoGastos(
          ingresoGastos.map((p) =>
            p.id === ingresoGasto.id ? data.updateIngresoGasto : p
          )
        )
      )
    setEditIngresoGasto(null)
  }
  const deleteIngresoGasto = (id) => {
    ingresoGastoService
      .delete(id, token)
      .then(() => setIngresoGastos(ingresoGastos.filter((p) => p.id !== id)))
  }

  return (
    <IngresoGastoContext.Provider
      value={{
        findIngresoGasto,
        createIngresoGasto,
        updateIngresoGasto,
        deleteIngresoGasto,
        editIngresoGasto,
        ingresoGastocargando,
        ingresoGastos,
        loading,
        createBodegaIngresoGasto1
      }}
    >
      {props.children}
    </IngresoGastoContext.Provider>
  )
}

export default IngresoGastoContextProvider

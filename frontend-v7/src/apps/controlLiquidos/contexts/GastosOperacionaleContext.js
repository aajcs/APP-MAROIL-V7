/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { GastosOperacionaleService } from '../services/GastosOperacionaleService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const GastosOperacionaleContext = createContext()

const GastosOperacionaleContextProvider = (props) => {
  const gastosOperacionaleService = new GastosOperacionaleService()
  // const cargaBodegaService = new CargaBodegaService()

  const [gastosOperacionales, setGastosOperacionales] = useState([])
  const [createBodegaGastosOperacionale1, setCreateBodegaGastosOperacionale1] =
    useState([])
  const [gastosOperacionalecargando, setgastosOperacionalecargando] =
    useState(null)
  const [editGastosOperacionale, setEditGastosOperacionale] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    gastosOperacionaleService.readAll(token).then((data) => {
      setGastosOperacionales(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      gastosOperacionaleService.readAll(token).then((data) => {
        setGastosOperacionales(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const gastosOperacionale = gastosOperacionales.find(
      (p) => p.estatusGastosOperacionale === 'OPERATIVO'
    )
    setgastosOperacionalecargando(gastosOperacionale)
  }, [gastosOperacionales])

  const findGastosOperacionale = (id) => {
    const gastosOperacionale = gastosOperacionales.find((p) => p.id === id)
    setEditGastosOperacionale(gastosOperacionale)
  }

  const createGastosOperacionale = (gastosOperacionale) => {
    gastosOperacionaleService.create(gastosOperacionale, token).then((data) => {
      setGastosOperacionales([
        ...gastosOperacionales,
        data.saveGastosOperacionale
      ])
      createBodegaGastosOperacionale(data.saveGastosOperacionale)
      setCreateBodegaGastosOperacionale1(data.saveGastosOperacionale)
    })
  }
  const createBodegaGastosOperacionale = (saveGastosOperacionale) => {
    const cargaBodega = {
      gastosOperacionaleID: saveGastosOperacionale.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveGastosOperacionale.cantidadBodegas)
    for (let i = 1; i <= saveGastosOperacionale.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // gastosOperacionaleService.create(CargaBodega, token).then((data) => {
    //   setGastosOperacionales([...gastosOperacionales, data.saveGastosOperacionale])
    //   console.log('gastosOperacionale creado', data.saveGastosOperacionale)
    // })
  }

  const updateGastosOperacionale = (gastosOperacionale) => {
    gastosOperacionaleService
      .update(gastosOperacionale, token)
      .then((data) =>
        setGastosOperacionales(
          gastosOperacionales.map((p) =>
            p.id === gastosOperacionale.id ? data.updateGastosOperacionale : p
          )
        )
      )
    setEditGastosOperacionale(null)
  }
  const deleteGastosOperacionale = (id) => {
    gastosOperacionaleService
      .delete(id, token)
      .then(() =>
        setGastosOperacionales(gastosOperacionales.filter((p) => p.id !== id))
      )
  }

  return (
    <GastosOperacionaleContext.Provider
      value={{
        findGastosOperacionale,
        createGastosOperacionale,
        updateGastosOperacionale,
        deleteGastosOperacionale,
        editGastosOperacionale,
        gastosOperacionalecargando,
        gastosOperacionales,
        loading,
        createBodegaGastosOperacionale1
      }}
    >
      {props.children}
    </GastosOperacionaleContext.Provider>
  )
}

export default GastosOperacionaleContextProvider

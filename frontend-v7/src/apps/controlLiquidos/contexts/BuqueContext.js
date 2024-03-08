/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { BuqueService } from '../services/BuqueService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const BuqueContext = createContext()

const BuqueContextProvider = (props) => {
  const buqueService = new BuqueService()
  // const cargaBodegaService = new CargaBodegaService()

  const [buques, setBuques] = useState([])
  const [createBodegaBuque1, setCreateBodegaBuque1] = useState([])
  const [buquecargando, setbuquecargando] = useState(null)
  const [editBuque, setEditBuque] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    buqueService.readAll(token).then((data) => {
      setBuques(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      buqueService.readAll(token).then((data) => {
        setBuques(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const buque = buques.find((p) => p.estatusBuque === 'OPERATIVO')
    setbuquecargando(buque)
  }, [buques])

  const findBuque = (id) => {
    const buque = buques.find((p) => p.id === id)
    setEditBuque(buque)
  }

  const createBuque = (buque) => {
    buqueService.create(buque, token).then((data) => {
      setBuques([...buques, data.saveBuque])
      createBodegaBuque(data.saveBuque)
      setCreateBodegaBuque1(data.saveBuque)
    })
  }
  const createBodegaBuque = (saveBuque) => {
    const cargaBodega = {
      buqueID: saveBuque.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveBuque.cantidadBodegas)
    for (let i = 1; i <= saveBuque.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // buqueService.create(CargaBodega, token).then((data) => {
    //   setBuques([...buques, data.saveBuque])
    //   console.log('buque creado', data.saveBuque)
    // })
  }

  const updateBuque = (buque) => {
    buqueService
      .update(buque, token)
      .then((data) =>
        setBuques(buques.map((p) => (p.id === buque.id ? data.updateBuque : p)))
      )
    setEditBuque(null)
  }
  const deleteBuque = (id) => {
    buqueService
      .delete(id, token)
      .then(() => setBuques(buques.filter((p) => p.id !== id)))
  }

  return (
    <BuqueContext.Provider
      value={{
        findBuque,
        createBuque,
        updateBuque,
        deleteBuque,
        editBuque,
        buquecargando,
        buques,
        loading,
        createBodegaBuque1
      }}
    >
      {props.children}
    </BuqueContext.Provider>
  )
}

export default BuqueContextProvider

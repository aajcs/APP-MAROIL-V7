/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { ViajeAuxService } from '../services/ViajeAuxService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const ViajeAuxContext = createContext()

const ViajeAuxContextProvider = (props) => {
  const viajeAuxService = new ViajeAuxService()
  // const cargaBodegaService = new CargaBodegaService()

  const [viajeAuxs, setViajeAuxs] = useState([])
  const [createBodegaViajeAux1, setCreateBodegaViajeAux1] = useState([])
  const [viajeAuxcargando, setviajeAuxcargando] = useState(null)
  const [editViajeAux, setEditViajeAux] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    viajeAuxService.readAll(token).then((data) => {
      setViajeAuxs(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      viajeAuxService.readAll(token).then((data) => {
        setViajeAuxs(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const viajeAux = viajeAuxs.find((p) => p.estatusViajeAux === 'OPERATIVO')
    setviajeAuxcargando(viajeAux)
  }, [viajeAuxs])

  const findViajeAux = (id) => {
    const viajeAux = viajeAuxs.find((p) => p.id === id)
    setEditViajeAux(viajeAux)
  }

  const createViajeAux = (viajeAux) => {
    viajeAuxService.create(viajeAux, token).then((data) => {
      setViajeAuxs([...viajeAuxs, data.saveViajeAux])
      createBodegaViajeAux(data.saveViajeAux)
      setCreateBodegaViajeAux1(data.saveViajeAux)
    })
  }
  const createBodegaViajeAux = (saveViajeAux) => {
    const cargaBodega = {
      viajeAuxID: saveViajeAux.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveViajeAux.cantidadBodegas)
    for (let i = 1; i <= saveViajeAux.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // viajeAuxService.create(CargaBodega, token).then((data) => {
    //   setViajeAuxs([...viajeAuxs, data.saveViajeAux])
    //   console.log('viajeAux creado', data.saveViajeAux)
    // })
  }

  const updateViajeAux = (viajeAux) => {
    viajeAuxService
      .update(viajeAux, token)
      .then((data) =>
        setViajeAuxs(
          viajeAuxs.map((p) => (p.id === viajeAux.id ? data.updateViajeAux : p))
        )
      )
    setEditViajeAux(null)
  }
  const deleteViajeAux = (id) => {
    viajeAuxService
      .delete(id, token)
      .then(() => setViajeAuxs(viajeAuxs.filter((p) => p.id !== id)))
  }

  return (
    <ViajeAuxContext.Provider
      value={{
        findViajeAux,
        createViajeAux,
        updateViajeAux,
        deleteViajeAux,
        editViajeAux,
        viajeAuxcargando,
        viajeAuxs,
        loading,
        createBodegaViajeAux1
      }}
    >
      {props.children}
    </ViajeAuxContext.Provider>
  )
}

export default ViajeAuxContextProvider

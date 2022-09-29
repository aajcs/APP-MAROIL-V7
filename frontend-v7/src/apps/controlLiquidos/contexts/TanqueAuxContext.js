/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { TanqueAuxService } from '../services/TanqueAuxService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const TanqueAuxContext = createContext()

const TanqueAuxContextProvider = (props) => {
  const tanqueAuxService = new TanqueAuxService()
  // const cargaBodegaService = new CargaBodegaService()

  const [tanqueAuxs, setTanqueAuxs] = useState([])
  const [createBodegaTanqueAux1, setCreateBodegaTanqueAux1] = useState([])
  const [tanqueAuxcargando, settanqueAuxcargando] = useState(null)
  const [editTanqueAux, setEditTanqueAux] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    tanqueAuxService.readAll(token).then((data) => {
      setTanqueAuxs(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      tanqueAuxService.readAll(token).then((data) => {
        setTanqueAuxs(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const tanqueAux = tanqueAuxs.find((p) => p.estatusTanqueAux === 'OPERATIVO')
    settanqueAuxcargando(tanqueAux)
  }, [tanqueAuxs])

  const findTanqueAux = (id) => {
    const tanqueAux = tanqueAuxs.find((p) => p.id === id)
    setEditTanqueAux(tanqueAux)
  }

  const createTanqueAux = (tanqueAux) => {
    tanqueAuxService.create(tanqueAux, token).then((data) => {
      setTanqueAuxs([...tanqueAuxs, data.saveTanqueAux])
      createBodegaTanqueAux(data.saveTanqueAux)
      setCreateBodegaTanqueAux1(data.saveTanqueAux)
    })
  }
  const createBodegaTanqueAux = (saveTanqueAux) => {
    const cargaBodega = {
      tanqueAuxID: saveTanqueAux.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveTanqueAux.cantidadBodegas)
    for (let i = 1; i <= saveTanqueAux.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // tanqueAuxService.create(CargaBodega, token).then((data) => {
    //   setTanqueAuxs([...tanqueAuxs, data.saveTanqueAux])
    //   console.log('tanqueAux creado', data.saveTanqueAux)
    // })
  }

  const updateTanqueAux = (tanqueAux) => {
    tanqueAuxService
      .update(tanqueAux, token)
      .then((data) =>
        setTanqueAuxs(
          tanqueAuxs.map((p) =>
            p.id === tanqueAux.id ? data.updateTanqueAux : p
          )
        )
      )
    setEditTanqueAux(null)
  }
  const deleteTanqueAux = (id) => {
    tanqueAuxService
      .delete(id, token)
      .then(() => setTanqueAuxs(tanqueAuxs.filter((p) => p.id !== id)))
  }

  return (
    <TanqueAuxContext.Provider
      value={{
        findTanqueAux,
        createTanqueAux,
        updateTanqueAux,
        deleteTanqueAux,
        editTanqueAux,
        tanqueAuxcargando,
        tanqueAuxs,
        loading,
        createBodegaTanqueAux1
      }}
    >
      {props.children}
    </TanqueAuxContext.Provider>
  )
}

export default TanqueAuxContextProvider

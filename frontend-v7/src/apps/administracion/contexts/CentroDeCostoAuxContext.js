/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { CentroDeCostoAuxService } from '../services/CentroDeCostoAuxService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const CentroDeCostoAuxContext = createContext()

const CentroDeCostoAuxContextProvider = (props) => {
  const centroDeCostoAuxService = new CentroDeCostoAuxService()
  // const cargaBodegaService = new CargaBodegaService()

  const [centroDeCostoAuxs, setCentroDeCostoAuxs] = useState([])
  const [createBodegaCentroDeCostoAux1, setCreateBodegaCentroDeCostoAux1] =
    useState([])
  const [centroDeCostoAuxcargando, setCentroDeCostoAuxcargando] = useState(null)
  const [editCentroDeCostoAux, setEditCentroDeCostoAux] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    centroDeCostoAuxService.readAll(token).then((data) => {
      setCentroDeCostoAuxs(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      centroDeCostoAuxService.readAll(token).then((data) => {
        setCentroDeCostoAuxs(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const centroDeCostoAux = centroDeCostoAuxs.find(
      (p) => p.estatusCentroDeCostoAux === 'OPERATIVO'
    )
    setCentroDeCostoAuxcargando(centroDeCostoAux)
  }, [centroDeCostoAuxs])

  const findCentroDeCostoAux = (id) => {
    const centroDeCostoAux = centroDeCostoAuxs.find((p) => p.id === id)
    setEditCentroDeCostoAux(centroDeCostoAux)
  }

  const createCentroDeCostoAux = (centroDeCostoAux) => {
    centroDeCostoAuxService.create(centroDeCostoAux, token).then((data) => {
      setCentroDeCostoAuxs([...centroDeCostoAuxs, data.saveCentroDeCostoAux])
      createBodegaCentroDeCostoAux(data.saveCentroDeCostoAux)
      setCreateBodegaCentroDeCostoAux1(data.saveCentroDeCostoAux)
    })
  }
  const createBodegaCentroDeCostoAux = (saveCentroDeCostoAux) => {
    const cargaBodega = {
      centroDeCostoAuxID: saveCentroDeCostoAux.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveCentroDeCostoAux.cantidadBodegas)
    for (let i = 1; i <= saveCentroDeCostoAux.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // centroDeCostoAuxService.create(CargaBodega, token).then((data) => {
    //   setCentroDeCostoAuxs([...centroDeCostoAuxs, data.saveCentroDeCostoAux])
    //   console.log('centroDeCostoAux creado', data.saveCentroDeCostoAux)
    // })
  }

  const updateCentroDeCostoAux = (centroDeCostoAux) => {
    centroDeCostoAuxService
      .update(centroDeCostoAux, token)
      .then((data) =>
        setCentroDeCostoAuxs(
          centroDeCostoAuxs.map((p) =>
            p.id === centroDeCostoAux.id ? data.updateCentroDeCosto : p
          )
        )
      )
    setEditCentroDeCostoAux(null)
  }
  const deleteCentroDeCostoAux = (id) => {
    centroDeCostoAuxService
      .delete(id, token)
      .then(() =>
        setCentroDeCostoAuxs(centroDeCostoAuxs.filter((p) => p.id !== id))
      )
  }

  return (
    <CentroDeCostoAuxContext.Provider
      value={{
        findCentroDeCostoAux,
        createCentroDeCostoAux,
        updateCentroDeCostoAux,
        deleteCentroDeCostoAux,
        editCentroDeCostoAux,
        centroDeCostoAuxcargando,
        centroDeCostoAuxs,
        loading,
        createBodegaCentroDeCostoAux1
      }}
    >
      {props.children}
    </CentroDeCostoAuxContext.Provider>
  )
}

export default CentroDeCostoAuxContextProvider

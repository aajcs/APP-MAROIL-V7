/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { ProcesoAuxService } from '../services/ProcesoAuxService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const ProcesoAuxContext = createContext()

const ProcesoAuxContextProvider = (props) => {
  const procesoAuxService = new ProcesoAuxService()
  // const cargaBodegaService = new CargaBodegaService()

  const [procesoAuxs, setProcesoAuxs] = useState([])
  const [createBodegaProcesoAux1, setCreateBodegaProcesoAux1] = useState([])
  const [procesoAuxcargando, setProcesoAuxcargando] = useState(null)
  const [editProcesoAux, setEditProcesoAux] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    procesoAuxService.readAll(token).then((data) => {
      setProcesoAuxs(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      procesoAuxService.readAll(token).then((data) => {
        setProcesoAuxs(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const procesoAux = procesoAuxs.find(
      (p) => p.estatusProcesoAux === 'OPERATIVO'
    )
    setProcesoAuxcargando(procesoAux)
  }, [procesoAuxs])

  const findProcesoAux = (id) => {
    const procesoAux = procesoAuxs.find((p) => p.id === id)
    setEditProcesoAux(procesoAux)
  }

  const createProcesoAux = (procesoAux) => {
    procesoAuxService.create(procesoAux, token).then((data) => {
      setProcesoAuxs([...procesoAuxs, data.saveProcesoAux])
      createBodegaProcesoAux(data.saveProcesoAux)
      setCreateBodegaProcesoAux1(data.saveProcesoAux)
    })
  }
  const createBodegaProcesoAux = (saveProcesoAux) => {
    const cargaBodega = {
      procesoAuxID: saveProcesoAux.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveProcesoAux.cantidadBodegas)
    for (let i = 1; i <= saveProcesoAux.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // procesoAuxService.create(CargaBodega, token).then((data) => {
    //   setProcesoAuxs([...procesoAuxs, data.saveProcesoAux])
    //   console.log('procesoAux creado', data.saveProcesoAux)
    // })
  }

  const updateProcesoAux = (procesoAux) => {
    procesoAuxService
      .update(procesoAux, token)
      .then((data) =>
        setProcesoAuxs(
          procesoAuxs.map((p) =>
            p.id === procesoAux.id ? data.updateProceso : p
          )
        )
      )
    setEditProcesoAux(null)
  }
  const deleteProcesoAux = (id) => {
    procesoAuxService
      .delete(id, token)
      .then(() => setProcesoAuxs(procesoAuxs.filter((p) => p.id !== id)))
  }

  return (
    <ProcesoAuxContext.Provider
      value={{
        findProcesoAux,
        createProcesoAux,
        updateProcesoAux,
        deleteProcesoAux,
        editProcesoAux,
        procesoAuxcargando,
        procesoAuxs,
        loading,
        createBodegaProcesoAux1
      }}
    >
      {props.children}
    </ProcesoAuxContext.Provider>
  )
}

export default ProcesoAuxContextProvider

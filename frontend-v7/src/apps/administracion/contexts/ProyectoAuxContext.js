/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { ProyectoAuxService } from '../services/ProyectoAuxService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const ProyectoAuxContext = createContext()

const ProyectoAuxContextProvider = (props) => {
  const proyectoAuxService = new ProyectoAuxService()
  // const cargaBodegaService = new CargaBodegaService()

  const [proyectoAuxs, setProyectoAuxs] = useState([])
  const [createBodegaProyectoAux1, setCreateBodegaProyectoAux1] = useState([])
  const [proyectoAuxcargando, setproyectoAuxcargando] = useState(null)
  const [editProyectoAux, setEditProyectoAux] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    proyectoAuxService.readAll(token).then((data) => {
      setProyectoAuxs(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      proyectoAuxService.readAll(token).then((data) => {
        setProyectoAuxs(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const proyectoAux = proyectoAuxs.find(
      (p) => p.estatusProyectoAux === 'OPERATIVO'
    )
    setproyectoAuxcargando(proyectoAux)
  }, [proyectoAuxs])

  const findProyectoAux = (id) => {
    const proyectoAux = proyectoAuxs.find((p) => p.id === id)
    setEditProyectoAux(proyectoAux)
  }

  const createProyectoAux = (proyectoAux) => {
    proyectoAuxService.create(proyectoAux, token).then((data) => {
      setProyectoAuxs([...proyectoAuxs, data.saveProyectoAux])
      createBodegaProyectoAux(data.saveProyectoAux)
      setCreateBodegaProyectoAux1(data.saveProyectoAux)
    })
  }
  const createBodegaProyectoAux = (saveProyectoAux) => {
    const cargaBodega = {
      proyectoAuxID: saveProyectoAux.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveProyectoAux.cantidadBodegas)
    for (let i = 1; i <= saveProyectoAux.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // proyectoAuxService.create(CargaBodega, token).then((data) => {
    //   setProyectoAuxs([...proyectoAuxs, data.saveProyectoAux])
    //   console.log('proyectoAux creado', data.saveProyectoAux)
    // })
  }

  const updateProyectoAux = (proyectoAux) => {
    proyectoAuxService
      .update(proyectoAux, token)
      .then((data) =>
        setProyectoAuxs(
          proyectoAuxs.map((p) =>
            p.id === proyectoAux.id ? data.updateProyectoAux : p
          )
        )
      )
    setEditProyectoAux(null)
  }
  const deleteProyectoAux = (id) => {
    proyectoAuxService
      .delete(id, token)
      .then(() => setProyectoAuxs(proyectoAuxs.filter((p) => p.id !== id)))
  }

  return (
    <ProyectoAuxContext.Provider
      value={{
        findProyectoAux,
        createProyectoAux,
        updateProyectoAux,
        deleteProyectoAux,
        editProyectoAux,
        proyectoAuxcargando,
        proyectoAuxs,
        loading,
        createBodegaProyectoAux1
      }}
    >
      {props.children}
    </ProyectoAuxContext.Provider>
  )
}

export default ProyectoAuxContextProvider

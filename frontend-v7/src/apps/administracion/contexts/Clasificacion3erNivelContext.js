/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { Clasificacion3erNivelService } from '../services/Clasificacion3erNivelService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const Clasificacion3erNivelContext = createContext()

const Clasificacion3erNivelContextProvider = (props) => {
  const clasificacion3erNivelService = new Clasificacion3erNivelService()
  // const cargaBodegaService = new CargaBodegaService()

  const [clasificacion3erNivels, setClasificacion3erNivels] = useState([])
  const [
    createBodegaClasificacion3erNivel1,
    setCreateBodegaClasificacion3erNivel1
  ] = useState([])
  const [clasificacion3erNivelcargando, setClasificacion3erNivelcargando] =
    useState(null)
  const [editClasificacion3erNivel, setEditClasificacion3erNivel] =
    useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    clasificacion3erNivelService.readAll(token).then((data) => {
      setClasificacion3erNivels(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      clasificacion3erNivelService.readAll(token).then((data) => {
        setClasificacion3erNivels(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const clasificacion3erNivel = clasificacion3erNivels.find(
      (p) => p.estatusClasificacion3erNivel === 'OPERATIVO'
    )
    setClasificacion3erNivelcargando(clasificacion3erNivel)
  }, [clasificacion3erNivels])

  const findClasificacion3erNivel = (id) => {
    const clasificacion3erNivel = clasificacion3erNivels.find(
      (p) => p.id === id
    )
    setEditClasificacion3erNivel(clasificacion3erNivel)
  }

  const createClasificacion3erNivel = (clasificacion3erNivel) => {
    clasificacion3erNivelService
      .create(clasificacion3erNivel, token)
      .then((data) => {
        setClasificacion3erNivels([
          ...clasificacion3erNivels,
          data.saveClasificacion3erNivel
        ])
        createBodegaClasificacion3erNivel(data.saveClasificacion3erNivel)
        setCreateBodegaClasificacion3erNivel1(data.saveClasificacion3erNivel)
      })
  }
  const createBodegaClasificacion3erNivel = (saveClasificacion3erNivel) => {
    const cargaBodega = {
      clasificacion3erNivelID: saveClasificacion3erNivel.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveClasificacion3erNivel.cantidadBodegas)
    for (let i = 1; i <= saveClasificacion3erNivel.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // clasificacion3erNivelService.create(CargaBodega, token).then((data) => {
    //   setClasificacion3erNivels([...clasificacion3erNivels, data.saveClasificacion3erNivel])
    //   console.log('clasificacion3erNivel creado', data.saveClasificacion3erNivel)
    // })
  }

  const updateClasificacion3erNivel = (clasificacion3erNivel) => {
    clasificacion3erNivelService
      .update(clasificacion3erNivel, token)
      .then((data) =>
        setClasificacion3erNivels(
          clasificacion3erNivels.map((p) =>
            p.id === clasificacion3erNivel.id
              ? data.updateClasificacion3erNivel
              : p
          )
        )
      )
    setEditClasificacion3erNivel(null)
  }
  const deleteClasificacion3erNivel = (id) => {
    clasificacion3erNivelService
      .delete(id, token)
      .then(() =>
        setClasificacion3erNivels(
          clasificacion3erNivels.filter((p) => p.id !== id)
        )
      )
  }

  return (
    <Clasificacion3erNivelContext.Provider
      value={{
        findClasificacion3erNivel,
        createClasificacion3erNivel,
        updateClasificacion3erNivel,
        deleteClasificacion3erNivel,
        editClasificacion3erNivel,
        clasificacion3erNivelcargando,
        clasificacion3erNivels,
        loading,
        createBodegaClasificacion3erNivel1
      }}
    >
      {props.children}
    </Clasificacion3erNivelContext.Provider>
  )
}

export default Clasificacion3erNivelContextProvider

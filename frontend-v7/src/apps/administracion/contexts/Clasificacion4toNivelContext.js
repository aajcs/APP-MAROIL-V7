/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { Clasificacion4toNivelService } from '../services/Clasificacion4toNivelService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const Clasificacion4toNivelContext = createContext()

const Clasificacion4toNivelContextProvider = (props) => {
  const clasificacion4toNivelService = new Clasificacion4toNivelService()
  // const cargaBodegaService = new CargaBodegaService()

  const [clasificacion4toNivels, setClasificacion4toNivels] = useState([])
  const [
    createBodegaClasificacion4toNivel1,
    setCreateBodegaClasificacion4toNivel1
  ] = useState([])
  const [clasificacion4toNivelcargando, setClasificacion4toNivelcargando] =
    useState(null)
  const [editClasificacion4toNivel, setEditClasificacion4toNivel] =
    useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    clasificacion4toNivelService.readAll(token).then((data) => {
      setClasificacion4toNivels(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      clasificacion4toNivelService.readAll(token).then((data) => {
        setClasificacion4toNivels(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const clasificacion4toNivel = clasificacion4toNivels.find(
      (p) => p.estatusClasificacion4toNivel === 'OPERATIVO'
    )
    setClasificacion4toNivelcargando(clasificacion4toNivel)
  }, [clasificacion4toNivels])

  const findClasificacion4toNivel = (id) => {
    const clasificacion4toNivel = clasificacion4toNivels.find(
      (p) => p.id === id
    )
    setEditClasificacion4toNivel(clasificacion4toNivel)
  }

  const createClasificacion4toNivel = (clasificacion4toNivel) => {
    clasificacion4toNivelService
      .create(clasificacion4toNivel, token)
      .then((data) => {
        setClasificacion4toNivels([
          ...clasificacion4toNivels,
          data.saveClasificacion4toNivel
        ])
        createBodegaClasificacion4toNivel(data.saveClasificacion4toNivel)
        setCreateBodegaClasificacion4toNivel1(data.saveClasificacion4toNivel)
      })
  }
  const createBodegaClasificacion4toNivel = (saveClasificacion4toNivel) => {
    const cargaBodega = {
      clasificacion4toNivelID: saveClasificacion4toNivel.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveClasificacion4toNivel.cantidadBodegas)
    for (let i = 1; i <= saveClasificacion4toNivel.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // clasificacion4toNivelService.create(CargaBodega, token).then((data) => {
    //   setClasificacion4toNivels([...clasificacion4toNivels, data.saveClasificacion4toNivel])
    //   console.log('clasificacion4toNivel creado', data.saveClasificacion4toNivel)
    // })
  }

  const updateClasificacion4toNivel = (clasificacion4toNivel) => {
    clasificacion4toNivelService
      .update(clasificacion4toNivel, token)
      .then((data) =>
        setClasificacion4toNivels(
          clasificacion4toNivels.map((p) =>
            p.id === clasificacion4toNivel.id
              ? data.updateClasificacion4toNivel
              : p
          )
        )
      )
    setEditClasificacion4toNivel(null)
  }
  const deleteClasificacion4toNivel = (id) => {
    clasificacion4toNivelService
      .delete(id, token)
      .then(() =>
        setClasificacion4toNivels(
          clasificacion4toNivels.filter((p) => p.id !== id)
        )
      )
  }

  return (
    <Clasificacion4toNivelContext.Provider
      value={{
        findClasificacion4toNivel,
        createClasificacion4toNivel,
        updateClasificacion4toNivel,
        deleteClasificacion4toNivel,
        editClasificacion4toNivel,
        clasificacion4toNivelcargando,
        clasificacion4toNivels,
        loading,
        createBodegaClasificacion4toNivel1
      }}
    >
      {props.children}
    </Clasificacion4toNivelContext.Provider>
  )
}

export default Clasificacion4toNivelContextProvider

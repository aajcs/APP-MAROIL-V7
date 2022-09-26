/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { EmbarcacionService } from '../services/EmbarcacionService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const EmbarcacionContext = createContext()

const EmbarcacionContextProvider = (props) => {
  const embarcacionService = new EmbarcacionService()
  // const cargaBodegaService = new CargaBodegaService()

  const [embarcacions, setEmbarcacions] = useState([])
  const [createBodegaEmbarcacion1, setCreateBodegaEmbarcacion1] = useState([])
  const [embarcacioncargando, setembarcacioncargando] = useState(null)
  const [editEmbarcacion, setEditEmbarcacion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    embarcacionService.readAll(token).then((data) => {
      setEmbarcacions(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      embarcacionService.readAll(token).then((data) => {
        setEmbarcacions(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const embarcacion = embarcacions.find(
      (p) => p.estatusEmbarcacion === 'OPERATIVO'
    )
    setembarcacioncargando(embarcacion)
  }, [embarcacions])

  const findEmbarcacion = (id) => {
    const embarcacion = embarcacions.find((p) => p.id === id)
    setEditEmbarcacion(embarcacion)
  }

  const createEmbarcacion = (embarcacion) => {
    embarcacionService.create(embarcacion, token).then((data) => {
      setEmbarcacions([...embarcacions, data.saveEmbarcacion])
      createBodegaEmbarcacion(data.saveEmbarcacion)
      setCreateBodegaEmbarcacion1(data.saveEmbarcacion)
    })
  }
  const createBodegaEmbarcacion = (saveEmbarcacion) => {
    const cargaBodega = {
      embarcacionID: saveEmbarcacion.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveEmbarcacion.cantidadBodegas)
    for (let i = 1; i <= saveEmbarcacion.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // embarcacionService.create(CargaBodega, token).then((data) => {
    //   setEmbarcacions([...embarcacions, data.saveEmbarcacion])
    //   console.log('embarcacion creado', data.saveEmbarcacion)
    // })
  }

  const updateEmbarcacion = (embarcacion) => {
    embarcacionService
      .update(embarcacion, token)
      .then((data) =>
        setEmbarcacions(
          embarcacions.map((p) =>
            p.id === embarcacion.id ? data.updateEmbarcacion : p
          )
        )
      )
    setEditEmbarcacion(null)
  }
  const deleteEmbarcacion = (id) => {
    embarcacionService
      .delete(id, token)
      .then(() => setEmbarcacions(embarcacions.filter((p) => p.id !== id)))
  }

  return (
    <EmbarcacionContext.Provider
      value={{
        findEmbarcacion,
        createEmbarcacion,
        updateEmbarcacion,
        deleteEmbarcacion,
        editEmbarcacion,
        embarcacioncargando,
        embarcacions,
        loading,
        createBodegaEmbarcacion1
      }}
    >
      {props.children}
    </EmbarcacionContext.Provider>
  )
}

export default EmbarcacionContextProvider

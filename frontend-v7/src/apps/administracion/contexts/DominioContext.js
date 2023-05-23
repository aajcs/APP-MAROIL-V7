/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { DominioService } from '../services/DominioService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const DominioContext = createContext()

const DominioContextProvider = (props) => {
  const dominioService = new DominioService()
  // const cargaBodegaService = new CargaBodegaService()

  const [dominios, setDominios] = useState([])
  const [createBodegaDominio1, setCreateBodegaDominio1] = useState([])
  const [dominiocargando, setDominiocargando] = useState(null)
  const [editDominio, setEditDominio] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    dominioService.readAll(token).then((data) => {
      setDominios(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      dominioService.readAll(token).then((data) => {
        setDominios(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const dominio = dominios.find((p) => p.estatusDominio === 'OPERATIVO')
    setDominiocargando(dominio)
  }, [dominios])

  const findDominio = (id) => {
    const dominio = dominios.find((p) => p.id === id)
    setEditDominio(dominio)
  }

  const createDominio = (dominio) => {
    dominioService.create(dominio, token).then((data) => {
      setDominios([...dominios, data.saveDominio])
      createBodegaDominio(data.saveDominio)
      setCreateBodegaDominio1(data.saveDominio)
    })
  }
  const createBodegaDominio = (saveDominio) => {
    const cargaBodega = {
      dominioID: saveDominio.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveDominio.cantidadBodegas)
    for (let i = 1; i <= saveDominio.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // dominioService.create(CargaBodega, token).then((data) => {
    //   setDominios([...dominios, data.saveDominio])
    //   console.log('dominio creado', data.saveDominio)
    // })
  }

  const updateDominio = (dominio) => {
    dominioService
      .update(dominio, token)
      .then((data) =>
        setDominios(
          dominios.map((p) => (p.id === dominio.id ? data.updateDominio : p))
        )
      )
    setEditDominio(null)
  }
  const deleteDominio = (id) => {
    dominioService
      .delete(id, token)
      .then(() => setDominios(dominios.filter((p) => p.id !== id)))
  }

  return (
    <DominioContext.Provider
      value={{
        findDominio,
        createDominio,
        updateDominio,
        deleteDominio,
        editDominio,
        dominiocargando,
        dominios,
        loading,
        createBodegaDominio1
      }}
    >
      {props.children}
    </DominioContext.Provider>
  )
}

export default DominioContextProvider

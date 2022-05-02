/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { CargaBodegaService } from '../services/CargaBodegaService.js'
import AuthUse from '../../../auth/AuthUse'
export const CargaBodegaContext = createContext()

const CargaBodegaContextProvider = (props) => {
  const cargaBodegaService = new CargaBodegaService()

  const [cargaBodegas, setCargaBodegas] = useState([])
  const [editCargaBodega, setEditCargaBodega] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)
  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    cargaBodegaService.readAll(token).then((data) => {
      setCargaBodegas(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      cargaBodegaService.readAll(token).then((data) => {
        setCargaBodegas(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  const findCargaBodega = (id) => {
    const cargaBodega = cargaBodegas.find((p) => p.id === id)
    setEditCargaBodega(cargaBodega)
  }

  const createCargaBodega = (cargaBodega) => {
    cargaBodegaService
      .create(cargaBodega, token)
      .then((data) =>
        setCargaBodegas([...cargaBodegas, data.savenewCargaBodega])
      )
  }

  const updateCargaBodega = (cargaBodega) => {
    cargaBodegaService
      .update(cargaBodega, token)
      .then((data) =>
        setCargaBodegas(
          cargaBodegas.map((p) =>
            p.id === cargaBodega.id ? data.updateCargaBodega : p
          )
        )
      )
    setEditCargaBodega(null)
  }

  const deleteCargaBodega = (id) => {
    cargaBodegaService
      .delete(id, token)
      .then(() => setCargaBodegas(cargaBodegas.filter((p) => p.id !== id)))
  }

  return (
    <CargaBodegaContext.Provider
      value={{
        findCargaBodega,
        createCargaBodega,
        updateCargaBodega,
        deleteCargaBodega,
        editCargaBodega,
        cargaBodegas,
        loading
      }}
    >
      {props.children}
    </CargaBodegaContext.Provider>
  )
}

export default CargaBodegaContextProvider

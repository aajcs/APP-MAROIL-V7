/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { GabarraService } from '../services/GabarraService'
import AuthUse from '../../../auth/AuthUse'

export const GabarraContext = createContext()

const GabarraContextProvider = (props) => {
  const gabarraService = new GabarraService()

  const [gabarras, setGabarras] = useState([])

  const [editGabarra, setEditGabarra] = useState(null)
  const [loading, setLoading] = useState(true)
  const auth = AuthUse()
  const token = auth.user.token
  useEffect(() => {
    gabarraService.readAll(token).then((data) => {
      setGabarras(data)
      setLoading(false)
    })
  }, [])
  const findGabarra = (id) => {
    const gabarra = gabarras.find((p) => p.id === id)
    setEditGabarra(gabarra)
  }

  const createGabarra = (gabarra) => {
    gabarraService
      .create(gabarra, token)
      .then((data) => setGabarras([...gabarras, data.saveGabarra]))
  }

  const updateGabarra = (gabarra) => {
    gabarraService
      .update(gabarra, token)
      .then((data) =>
        setGabarras(
          gabarras.map((p) => (p.id === gabarra.id ? data.updategabarra : p))
        )
      )

    setEditGabarra(null)
  }

  const deleteGabarra = (id) => {
    gabarraService
      .delete(id, token)
      .then(() => setGabarras(gabarras.filter((p) => p.id !== id)))
  }

  return (
    <GabarraContext.Provider
      value={{
        findGabarra,
        createGabarra,
        updateGabarra,
        deleteGabarra,
        editGabarra,
        gabarras,
        loading
      }}
    >
      {props.children}
    </GabarraContext.Provider>
  )
}

export default GabarraContextProvider

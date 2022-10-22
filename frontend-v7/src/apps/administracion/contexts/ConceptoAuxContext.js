/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { ConceptoAuxService } from '../services/ConceptoAuxService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const ConceptoAuxContext = createContext()

const ConceptoAuxContextProvider = (props) => {
  const conceptoAuxService = new ConceptoAuxService()
  // const cargaBodegaService = new CargaBodegaService()

  const [conceptoAuxs, setConceptoAuxs] = useState([])
  const [createBodegaConceptoAux1, setCreateBodegaConceptoAux1] = useState([])
  const [conceptoAuxcargando, setConceptoAuxcargando] = useState(null)
  const [editConceptoAux, setEditConceptoAux] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    conceptoAuxService.readAll(token).then((data) => {
      setConceptoAuxs(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      conceptoAuxService.readAll(token).then((data) => {
        setConceptoAuxs(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const conceptoAux = conceptoAuxs.find(
      (p) => p.estatusConceptoAux === 'OPERATIVO'
    )
    setConceptoAuxcargando(conceptoAux)
  }, [conceptoAuxs])

  const findConceptoAux = (id) => {
    const conceptoAux = conceptoAuxs.find((p) => p.id === id)
    setEditConceptoAux(conceptoAux)
  }

  const createConceptoAux = (conceptoAux) => {
    conceptoAuxService.create(conceptoAux, token).then((data) => {
      setConceptoAuxs([...conceptoAuxs, data.saveConceptoAux])
      createBodegaConceptoAux(data.saveConceptoAux)
      setCreateBodegaConceptoAux1(data.saveConceptoAux)
    })
  }
  const createBodegaConceptoAux = (saveConceptoAux) => {
    const cargaBodega = {
      conceptoAuxID: saveConceptoAux.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveConceptoAux.cantidadBodegas)
    for (let i = 1; i <= saveConceptoAux.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // conceptoAuxService.create(CargaBodega, token).then((data) => {
    //   setConceptoAuxs([...conceptoAuxs, data.saveConceptoAux])
    //   console.log('conceptoAux creado', data.saveConceptoAux)
    // })
  }

  const updateConceptoAux = (conceptoAux) => {
    conceptoAuxService
      .update(conceptoAux, token)
      .then((data) =>
        setConceptoAuxs(
          conceptoAuxs.map((p) =>
            p.id === conceptoAux.id ? data.updateProceso : p
          )
        )
      )
    setEditConceptoAux(null)
  }
  const deleteConceptoAux = (id) => {
    conceptoAuxService
      .delete(id, token)
      .then(() => setConceptoAuxs(conceptoAuxs.filter((p) => p.id !== id)))
  }

  return (
    <ConceptoAuxContext.Provider
      value={{
        findConceptoAux,
        createConceptoAux,
        updateConceptoAux,
        deleteConceptoAux,
        editConceptoAux,
        conceptoAuxcargando,
        conceptoAuxs,
        loading,
        createBodegaConceptoAux1
      }}
    >
      {props.children}
    </ConceptoAuxContext.Provider>
  )
}

export default ConceptoAuxContextProvider

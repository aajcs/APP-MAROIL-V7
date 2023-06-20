/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { ProformaService } from '../services/ProformaService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const ProformaContext = createContext()

const ProformaContextProvider = (props) => {
  const proformaService = new ProformaService()
  // const cargaBodegaService = new CargaBodegaService()

  const [proformas, setProformas] = useState([])
  const [createBodegaProforma1, setCreateBodegaProforma1] = useState([])
  const [proformacargando, setProformacargando] = useState(null)
  const [editProforma, setEditProforma] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    proformaService.readAll(token).then((data) => {
      setProformas(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      proformaService.readAll(token).then((data) => {
        setProformas(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const proforma = proformas.find((p) => p.estatusProforma === 'OPERATIVO')
    setProformacargando(proforma)
  }, [proformas])

  const findProforma = (id) => {
    const proforma = proformas.find((p) => p.id === id)
    setEditProforma(proforma)
  }

  const createProforma = (proforma) => {
    proformaService.create(proforma, token).then((data) => {
      setProformas([...proformas, data.saveProforma])
      createBodegaProforma(data.saveProforma)
      setCreateBodegaProforma1(data.saveProforma)
    })
  }
  const createBodegaProforma = (saveProforma) => {
    const cargaBodega = {
      proformaID: saveProforma.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveProforma.cantidadBodegas)
    for (let i = 1; i <= saveProforma.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // proformaService.create(CargaBodega, token).then((data) => {
    //   setProformas([...proformas, data.saveProforma])
    //   console.log('proforma creado', data.saveProforma)
    // })
  }

  const updateProforma = (proforma) => {
    proformaService
      .update(proforma, token)
      .then((data) =>
        setProformas(
          proformas.map((p) => (p.id === proforma.id ? data.updateProforma : p))
        )
      )
    setEditProforma(null)
  }
  const deleteProforma = (id) => {
    proformaService
      .delete(id, token)
      .then(() => setProformas(proformas.filter((p) => p.id !== id)))
  }

  return (
    <ProformaContext.Provider
      value={{
        findProforma,
        createProforma,
        updateProforma,
        deleteProforma,
        editProforma,
        setEditProforma,
        proformacargando,
        proformas,
        loading,
        createBodegaProforma1
      }}
    >
      {props.children}
    </ProformaContext.Provider>
  )
}

export default ProformaContextProvider

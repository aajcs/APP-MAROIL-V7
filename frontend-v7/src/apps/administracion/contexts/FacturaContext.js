/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { FacturaService } from '../services/FacturaService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const FacturaContext = createContext()

const FacturaContextProvider = (props) => {
  const facturaService = new FacturaService()
  // const cargaBodegaService = new CargaBodegaService()

  const [facturas, setFacturas] = useState([])
  const [createBodegaFactura1, setCreateBodegaFactura1] = useState([])
  const [facturacargando, setFacturacargando] = useState(null)
  const [editFactura, setEditFactura] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    facturaService.readAll(token).then((data) => {
      setFacturas(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      facturaService.readAll(token).then((data) => {
        setFacturas(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const factura = facturas.find((p) => p.estatusFactura === 'OPERATIVO')
    setFacturacargando(factura)
  }, [facturas])

  const findFactura = (id) => {
    const factura = facturas.find((p) => p.id === id)
    setEditFactura(factura)
  }

  const createFactura = (factura) => {
    facturaService.create(factura, token).then((data) => {
      setFacturas([...facturas, data.saveFactura])
      createBodegaFactura(data.saveFactura)
      setCreateBodegaFactura1(data.saveFactura)
    })
  }
  const createBodegaFactura = (saveFactura) => {
    const cargaBodega = {
      facturaID: saveFactura.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveFactura.cantidadBodegas)
    for (let i = 1; i <= saveFactura.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // facturaService.create(CargaBodega, token).then((data) => {
    //   setFacturas([...facturas, data.saveFactura])
    //   console.log('factura creado', data.saveFactura)
    // })
  }

  const updateFactura = (factura) => {
    facturaService
      .update(factura, token)
      .then((data) =>
        setFacturas(
          facturas.map((p) => (p.id === factura.id ? data.updateFactura : p))
        )
      )
    setEditFactura(null)
  }
  const deleteFactura = (id) => {
    facturaService
      .delete(id, token)
      .then(() => setFacturas(facturas.filter((p) => p.id !== id)))
  }

  return (
    <FacturaContext.Provider
      value={{
        findFactura,
        createFactura,
        updateFactura,
        deleteFactura,
        editFactura,
        facturacargando,
        facturas,
        loading,
        createBodegaFactura1
      }}
    >
      {props.children}
    </FacturaContext.Provider>
  )
}

export default FacturaContextProvider

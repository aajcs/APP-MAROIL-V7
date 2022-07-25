/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { ProveedorService } from '../services/ProveedorService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const ProveedorContext = createContext()

const ProveedorContextProvider = (props) => {
  const proveedorService = new ProveedorService()
  // const cargaBodegaService = new CargaBodegaService()

  const [proveedors, setProveedors] = useState([])
  const [createBodegaProveedor1, setCreateBodegaProveedor1] = useState([])
  const [proveedorcargando, setProveedorcargando] = useState(null)
  const [editProveedor, setEditProveedor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    proveedorService.readAll(token).then((data) => {
      setProveedors(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      proveedorService.readAll(token).then((data) => {
        setProveedors(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const proveedor = proveedors.find((p) => p.estatusProveedor === 'OPERATIVO')
    setProveedorcargando(proveedor)
  }, [proveedors])

  const findProveedor = (id) => {
    const proveedor = proveedors.find((p) => p.id === id)
    setEditProveedor(proveedor)
  }

  const createProveedor = (proveedor) => {
    proveedorService.create(proveedor, token).then((data) => {
      setProveedors([...proveedors, data.saveProveedor])
      createBodegaProveedor(data.saveProveedor)
      setCreateBodegaProveedor1(data.saveProveedor)
    })
  }
  const createBodegaProveedor = (saveProveedor) => {
    const cargaBodega = {
      proveedorID: saveProveedor.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveProveedor.cantidadBodegas)
    for (let i = 1; i <= saveProveedor.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // proveedorService.create(CargaBodega, token).then((data) => {
    //   setProveedors([...proveedors, data.saveProveedor])
    //   console.log('proveedor creado', data.saveProveedor)
    // })
  }

  const updateProveedor = (proveedor) => {
    proveedorService
      .update(proveedor, token)
      .then((data) =>
        setProveedors(
          proveedors.map((p) =>
            p.id === proveedor.id ? data.updateProveedor : p
          )
        )
      )
    setEditProveedor(null)
  }
  const deleteProveedor = (id) => {
    proveedorService
      .delete(id, token)
      .then(() => setProveedors(proveedors.filter((p) => p.id !== id)))
  }

  return (
    <ProveedorContext.Provider
      value={{
        findProveedor,
        createProveedor,
        updateProveedor,
        deleteProveedor,
        editProveedor,
        proveedorcargando,
        proveedors,
        loading,
        createBodegaProveedor1
      }}
    >
      {props.children}
    </ProveedorContext.Provider>
  )
}

export default ProveedorContextProvider

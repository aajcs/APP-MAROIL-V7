/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { PresupuestoService } from '../services/PresupuestoService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const PresupuestoContext = createContext()

const PresupuestoContextProvider = (props) => {
  const presupuestoService = new PresupuestoService()
  // const cargaBodegaService = new CargaBodegaService()

  const [presupuestos, setPresupuestos] = useState([])
  const [createBodegaPresupuesto1, setCreateBodegaPresupuesto1] = useState([])
  const [presupuestocargando, setPresupuestocargando] = useState(null)
  const [editPresupuesto, setEditPresupuesto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    presupuestoService.readAll(token).then((data) => {
      setPresupuestos(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      presupuestoService.readAll(token).then((data) => {
        setPresupuestos(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const presupuesto = presupuestos.find(
      (p) => p.estatusPresupuesto === 'OPERATIVO'
    )
    setPresupuestocargando(presupuesto)
  }, [presupuestos])

  const findPresupuesto = (id) => {
    const presupuesto = presupuestos.find((p) => p.id === id)
    setEditPresupuesto(presupuesto)
  }

  const createPresupuesto = (presupuesto) => {
    presupuestoService.create(presupuesto, token).then((data) => {
      setPresupuestos([...presupuestos, data.savePresupuesto])
      createBodegaPresupuesto(data.savePresupuesto)
      setCreateBodegaPresupuesto1(data.savePresupuesto)
    })
  }
  const createBodegaPresupuesto = (savePresupuesto) => {
    const cargaBodega = {
      presupuestoID: savePresupuesto.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= savePresupuesto.cantidadBodegas)
    for (let i = 1; i <= savePresupuesto.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // presupuestoService.create(CargaBodega, token).then((data) => {
    //   setPresupuestos([...presupuestos, data.savePresupuesto])
    //   console.log('presupuesto creado', data.savePresupuesto)
    // })
  }

  const updatePresupuesto = (presupuesto) => {
    presupuestoService
      .update(presupuesto, token)
      .then((data) =>
        setPresupuestos(
          presupuestos.map((p) =>
            p.id === presupuesto.id ? data.updatePresupuesto : p
          )
        )
      )
    setEditPresupuesto(null)
  }
  const deletePresupuesto = (id) => {
    presupuestoService
      .delete(id, token)
      .then(() => setPresupuestos(presupuestos.filter((p) => p.id !== id)))
  }

  return (
    <PresupuestoContext.Provider
      value={{
        findPresupuesto,
        createPresupuesto,
        updatePresupuesto,
        deletePresupuesto,
        editPresupuesto,
        presupuestocargando,
        presupuestos,
        loading,
        createBodegaPresupuesto1
      }}
    >
      {props.children}
    </PresupuestoContext.Provider>
  )
}

export default PresupuestoContextProvider

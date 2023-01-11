/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { GanadorService } from '../services/GanadorService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const GanadorContext = createContext()

const GanadorContextProvider = (props) => {
  const ganadorService = new GanadorService()
  // const cargaBodegaService = new CargaBodegaService()

  const [ganadors, setGanadors] = useState([])
  const [ganadors36, setGanadors36] = useState([])
  const [createBodegaGanador1, setCreateBodegaGanador1] = useState([])
  const [ganadorcargando, setganadorcargando] = useState(null)
  const [editGanador, setEditGanador] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    ganadorService.readAll(token).then((data) => {
      setGanadors(data)
      setGanadors36(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      ganadorService.readAll(token).then((data) => {
        setGanadors36(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 52000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    // const ganador = ganadors.find((p) => p.estatusGanador === 'OPERATIVO')
    setganadorcargando(ganadors)
  }, [ganadors])

  const findGanador = (id) => {
    const ganador = ganadors.find((p) => p.id === id)
    setEditGanador(ganador)
  }

  const createGanador = (ganador) => {
    ganadorService.create(ganador, token).then((data) => {
      setGanadors([...ganadors, data.saveGanador])
      createBodegaGanador(data.saveGanador)
      setCreateBodegaGanador1(data.saveGanador)
    })
  }
  const createBodegaGanador = (saveGanador) => {
    const cargaBodega = {
      ganadorID: saveGanador.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveGanador.cantidadBodegas)
    for (let i = 1; i <= saveGanador.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // ganadorService.create(CargaBodega, token).then((data) => {
    //   setGanadors([...ganadors, data.saveGanador])
    //   console.log('ganador creado', data.saveGanador)
    // })
  }

  const updateGanador = (ganador) => {
    ganadorService
      .update(ganador, token)
      .then((data) =>
        setGanadors(
          ganadors.map((p) => (p.id === ganador.id ? data.updateGanador : p))
        )
      )
    setEditGanador(null)
  }
  const deleteGanador = (id) => {
    ganadorService
      .delete(id, token)
      .then(() => setGanadors(ganadors.filter((p) => p.id !== id)))
  }

  return (
    <GanadorContext.Provider
      value={{
        findGanador,
        createGanador,
        updateGanador,
        deleteGanador,
        editGanador,
        ganadorcargando,
        ganadors,
        loading,
        createBodegaGanador1,
        ganadors36
      }}
    >
      {props.children}
    </GanadorContext.Provider>
  )
}

export default GanadorContextProvider

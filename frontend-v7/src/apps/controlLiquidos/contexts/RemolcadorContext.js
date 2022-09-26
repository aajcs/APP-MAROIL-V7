/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { RemolcadorService } from '../services/RemolcadorService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const RemolcadorContext = createContext()

const RemolcadorContextProvider = (props) => {
  const remolcadorService = new RemolcadorService()
  // const cargaBodegaService = new CargaBodegaService()

  const [remolcadors, setRemolcadors] = useState([])
  const [createBodegaRemolcador1, setCreateBodegaRemolcador1] = useState([])
  const [remolcadorcargando, setremolcadorcargando] = useState(null)
  const [editRemolcador, setEditRemolcador] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    remolcadorService.readAll(token).then((data) => {
      setRemolcadors(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      remolcadorService.readAll(token).then((data) => {
        setRemolcadors(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const remolcador = remolcadors.find(
      (p) => p.estatusRemolcador === 'OPERATIVO'
    )
    setremolcadorcargando(remolcador)
  }, [remolcadors])

  const findRemolcador = (id) => {
    const remolcador = remolcadors.find((p) => p.id === id)
    setEditRemolcador(remolcador)
  }

  const createRemolcador = (remolcador) => {
    remolcadorService.create(remolcador, token).then((data) => {
      setRemolcadors([...remolcadors, data.saveRemolcador])
      createBodegaRemolcador(data.saveRemolcador)
      setCreateBodegaRemolcador1(data.saveRemolcador)
    })
  }
  const createBodegaRemolcador = (saveRemolcador) => {
    const cargaBodega = {
      remolcadorID: saveRemolcador.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveRemolcador.cantidadBodegas)
    for (let i = 1; i <= saveRemolcador.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // remolcadorService.create(CargaBodega, token).then((data) => {
    //   setRemolcadors([...remolcadors, data.saveRemolcador])
    //   console.log('remolcador creado', data.saveRemolcador)
    // })
  }

  const updateRemolcador = (remolcador) => {
    remolcadorService
      .update(remolcador, token)
      .then((data) =>
        setRemolcadors(
          remolcadors.map((p) =>
            p.id === remolcador.id ? data.updateRemolcador : p
          )
        )
      )
    setEditRemolcador(null)
  }
  const deleteRemolcador = (id) => {
    remolcadorService
      .delete(id, token)
      .then(() => setRemolcadors(remolcadors.filter((p) => p.id !== id)))
  }

  return (
    <RemolcadorContext.Provider
      value={{
        findRemolcador,
        createRemolcador,
        updateRemolcador,
        deleteRemolcador,
        editRemolcador,
        remolcadorcargando,
        remolcadors,
        loading,
        createBodegaRemolcador1
      }}
    >
      {props.children}
    </RemolcadorContext.Provider>
  )
}

export default RemolcadorContextProvider

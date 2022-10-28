/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { MensualidadOpMesService } from '../services/MensualidadOpMesService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const MensualidadOpMesContext = createContext()

const MensualidadOpMesContextProvider = (props) => {
  const mensualidadOpMesService = new MensualidadOpMesService()
  // const cargaBodegaService = new CargaBodegaService()

  const [mensualidadOpMess, setMensualidadOpMess] = useState([])
  const [createBodegaMensualidadOpMes1, setCreateBodegaMensualidadOpMes1] =
    useState([])
  const [mensualidadOpMescargando, setMensualidadOpMescargando] = useState(null)
  const [editMensualidadOpMes, setEditMensualidadOpMes] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    mensualidadOpMesService.readAll(token).then((data) => {
      setMensualidadOpMess(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      mensualidadOpMesService.readAll(token).then((data) => {
        setMensualidadOpMess(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const mensualidadOpMes = mensualidadOpMess.find(
      (p) => p.estatusMensualidadOpMes === 'OPERATIVO'
    )
    setMensualidadOpMescargando(mensualidadOpMes)
  }, [mensualidadOpMess])

  const findMensualidadOpMes = (id) => {
    const mensualidadOpMes = mensualidadOpMess.find((p) => p.id === id)
    setEditMensualidadOpMes(mensualidadOpMes)
  }

  const createMensualidadOpMes = (mensualidadOpMes) => {
    mensualidadOpMesService.create(mensualidadOpMes, token).then((data) => {
      setMensualidadOpMess([...mensualidadOpMess, data.saveMensualidadOpMes])
      createBodegaMensualidadOpMes(data.saveMensualidadOpMes)
      setCreateBodegaMensualidadOpMes1(data.saveMensualidadOpMes)
    })
  }
  const createBodegaMensualidadOpMes = (saveMensualidadOpMes) => {
    const cargaBodega = {
      mensualidadOpMesID: saveMensualidadOpMes.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveMensualidadOpMes.cantidadBodegas)
    for (let i = 1; i <= saveMensualidadOpMes.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // mensualidadOpMesService.create(CargaBodega, token).then((data) => {
    //   setMensualidadOpMess([...mensualidadOpMess, data.saveMensualidadOpMes])
    //   console.log('mensualidadOpMes creado', data.saveMensualidadOpMes)
    // })
  }

  const updateMensualidadOpMes = (mensualidadOpMes) => {
    mensualidadOpMesService
      .update(mensualidadOpMes, token)
      .then((data) =>
        setMensualidadOpMess(
          mensualidadOpMess.map((p) =>
            p.id === mensualidadOpMes.id ? data.updateMensualidadOpMes : p
          )
        )
      )
    setEditMensualidadOpMes(null)
  }
  const deleteMensualidadOpMes = (id) => {
    mensualidadOpMesService
      .delete(id, token)
      .then(() =>
        setMensualidadOpMess(mensualidadOpMess.filter((p) => p.id !== id))
      )
  }

  return (
    <MensualidadOpMesContext.Provider
      value={{
        findMensualidadOpMes,
        createMensualidadOpMes,
        updateMensualidadOpMes,
        deleteMensualidadOpMes,
        editMensualidadOpMes,
        mensualidadOpMescargando,
        mensualidadOpMess,
        loading,
        createBodegaMensualidadOpMes1
      }}
    >
      {props.children}
    </MensualidadOpMesContext.Provider>
  )
}

export default MensualidadOpMesContextProvider

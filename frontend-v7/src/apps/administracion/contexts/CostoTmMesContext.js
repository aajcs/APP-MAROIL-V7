/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { CostoTmMesService } from '../services/CostoTmMesService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const CostoTmMesContext = createContext()

const CostoTmMesContextProvider = (props) => {
  const costoTmMesService = new CostoTmMesService()
  // const cargaBodegaService = new CargaBodegaService()

  const [costoTmMess, setCostoTmMess] = useState([])
  const [createBodegaCostoTmMes1, setCreateBodegaCostoTmMes1] = useState([])
  const [costoTmMescargando, setCostoTmMescargando] = useState(null)
  const [editCostoTmMes, setEditCostoTmMes] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    costoTmMesService.readAll(token).then((data) => {
      setCostoTmMess(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      costoTmMesService.readAll(token).then((data) => {
        setCostoTmMess(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const costoTmMes = costoTmMess.find(
      (p) => p.estatusCostoTmMes === 'OPERATIVO'
    )
    setCostoTmMescargando(costoTmMes)
  }, [costoTmMess])

  const findCostoTmMes = (id) => {
    const costoTmMes = costoTmMess.find((p) => p.id === id)
    setEditCostoTmMes(costoTmMes)
  }

  const createCostoTmMes = (costoTmMes) => {
    costoTmMesService.create(costoTmMes, token).then((data) => {
      setCostoTmMess([...costoTmMess, data.saveCostoTmMes])
      createBodegaCostoTmMes(data.saveCostoTmMes)
      setCreateBodegaCostoTmMes1(data.saveCostoTmMes)
    })
  }
  const createBodegaCostoTmMes = (saveCostoTmMes) => {
    const cargaBodega = {
      costoTmMesID: saveCostoTmMes.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveCostoTmMes.cantidadBodegas)
    for (let i = 1; i <= saveCostoTmMes.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // costoTmMesService.create(CargaBodega, token).then((data) => {
    //   setCostoTmMess([...costoTmMess, data.saveCostoTmMes])
    //   console.log('costoTmMes creado', data.saveCostoTmMes)
    // })
  }

  const updateCostoTmMes = (costoTmMes) => {
    costoTmMesService
      .update(costoTmMes, token)
      .then((data) =>
        setCostoTmMess(
          costoTmMess.map((p) =>
            p.id === costoTmMes.id ? data.updateCostoTmMes : p
          )
        )
      )
    setEditCostoTmMes(null)
  }
  const deleteCostoTmMes = (id) => {
    costoTmMesService
      .delete(id, token)
      .then(() => setCostoTmMess(costoTmMess.filter((p) => p.id !== id)))
  }

  return (
    <CostoTmMesContext.Provider
      value={{
        findCostoTmMes,
        createCostoTmMes,
        updateCostoTmMes,
        deleteCostoTmMes,
        editCostoTmMes,
        costoTmMescargando,
        costoTmMess,
        loading,
        createBodegaCostoTmMes1
      }}
    >
      {props.children}
    </CostoTmMesContext.Provider>
  )
}

export default CostoTmMesContextProvider

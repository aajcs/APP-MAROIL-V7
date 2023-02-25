/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { CodificacionService } from '../services/CodificacionService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const CodificacionContext = createContext()

const CodificacionContextProvider = (props) => {
  const codificacionService = new CodificacionService()
  // const cargaBodegaService = new CargaBodegaService()

  const [codificacions, setCodificacions] = useState([])
  const [createBodegaCodificacion1, setCreateBodegaCodificacion1] = useState([])
  const [codificacioncargando, setCodificacioncargando] = useState(null)
  const [editCodificacion, setEditCodificacion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    codificacionService.readAll(token).then((data) => {
      setCodificacions(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      codificacionService.readAll(token).then((data) => {
        setCodificacions(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const codificacion = codificacions.find(
      (p) => p.estatusCodificacion === 'OPERATIVO'
    )
    setCodificacioncargando(codificacion)
  }, [codificacions])

  const findCodificacion = (id) => {
    const codificacion = codificacions.find((p) => p.id === id)
    setEditCodificacion(codificacion)
  }

  const createCodificacion = (codificacion) => {
    codificacionService.create(codificacion, token).then((data) => {
      setCodificacions([...codificacions, data.saveCodificacion])
      createBodegaCodificacion(data.saveCodificacion)
      setCreateBodegaCodificacion1(data.saveCodificacion)
    })
  }
  const createBodegaCodificacion = (saveCodificacion) => {
    const cargaBodega = {
      codificacionID: saveCodificacion.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveCodificacion.cantidadBodegas)
    for (let i = 1; i <= saveCodificacion.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // codificacionService.create(CargaBodega, token).then((data) => {
    //   setCodificacions([...codificacions, data.saveCodificacion])
    //   console.log('codificacion creado', data.saveCodificacion)
    // })
  }

  const updateCodificacion = (codificacion) => {
    codificacionService
      .update(codificacion, token)
      .then((data) =>
        setCodificacions(
          codificacions.map((p) =>
            p.id === codificacion.id ? data.updateCodificacion : p
          )
        )
      )
    setEditCodificacion(null)
  }
  const deleteCodificacion = (id) => {
    codificacionService
      .delete(id, token)
      .then(() => setCodificacions(codificacions.filter((p) => p.id !== id)))
  }

  return (
    <CodificacionContext.Provider
      value={{
        findCodificacion,
        createCodificacion,
        updateCodificacion,
        deleteCodificacion,
        editCodificacion,
        codificacioncargando,
        codificacions,
        loading,
        createBodegaCodificacion1
      }}
    >
      {props.children}
    </CodificacionContext.Provider>
  )
}

export default CodificacionContextProvider

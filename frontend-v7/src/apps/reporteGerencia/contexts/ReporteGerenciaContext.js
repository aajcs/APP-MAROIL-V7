/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { ReporteGerenciaServiceService } from '../services/ReporteGerenciaService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const ReporteGerenciaServiceContext = createContext()

const ReporteGerenciaServiceContextProvider = (props) => {
  const reporteGerenciaServiceService = new ReporteGerenciaServiceService()
  // const cargaBodegaService = new CargaBodegaService()

  const [reporteGerenciaServices, setReporteGerenciaServices] = useState([])
  const [
    createBodegaReporteGerenciaService1,
    setCreateBodegaReporteGerenciaService1
  ] = useState([])
  const [reporteGerenciaServicecargando, setreporteGerenciaServicecargando] =
    useState(null)
  const [editReporteGerenciaService, setEditReporteGerenciaService] =
    useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    reporteGerenciaServiceService.readAll(token).then((data) => {
      setReporteGerenciaServices(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      reporteGerenciaServiceService.readAll(token).then((data) => {
        setReporteGerenciaServices(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const reporteGerenciaService = reporteGerenciaServices.find(
      (p) => p.estatusReporteGerenciaService === 'OPERATIVO'
    )
    setreporteGerenciaServicecargando(reporteGerenciaService)
  }, [reporteGerenciaServices])

  const findReporteGerenciaService = (id) => {
    const reporteGerenciaService = reporteGerenciaServices.find(
      (p) => p.id === id
    )
    setEditReporteGerenciaService(reporteGerenciaService)
  }

  const createReporteGerenciaService = (reporteGerenciaService) => {
    reporteGerenciaServiceService
      .create(reporteGerenciaService, token)
      .then((data) => {
        setReporteGerenciaServices([
          ...reporteGerenciaServices,
          data.saveReporteGerenciaService
        ])
        createBodegaReporteGerenciaService(data.saveReporteGerenciaService)
        setCreateBodegaReporteGerenciaService1(data.saveReporteGerenciaService)
      })
  }
  const createBodegaReporteGerenciaService = (saveReporteGerenciaService) => {
    const cargaBodega = {
      reporteGerenciaServiceID: saveReporteGerenciaService.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveReporteGerenciaService.cantidadBodegas)
    for (let i = 1; i <= saveReporteGerenciaService.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // reporteGerenciaServiceService.create(CargaBodega, token).then((data) => {
    //   setReporteGerenciaServices([...reporteGerenciaServices, data.saveReporteGerenciaService])
    //   console.log('reporteGerenciaService creado', data.saveReporteGerenciaService)
    // })
  }

  const updateReporteGerenciaService = (reporteGerenciaService) => {
    reporteGerenciaServiceService
      .update(reporteGerenciaService, token)
      .then((data) =>
        setReporteGerenciaServices(
          reporteGerenciaServices.map((p) =>
            p.id === reporteGerenciaService.id
              ? data.updateReporteGerenciaService
              : p
          )
        )
      )
    setEditReporteGerenciaService(null)
  }
  const deleteReporteGerenciaService = (id) => {
    reporteGerenciaServiceService
      .delete(id, token)
      .then(() =>
        setReporteGerenciaServices(
          reporteGerenciaServices.filter((p) => p.id !== id)
        )
      )
  }

  return (
    <ReporteGerenciaServiceContext.Provider
      value={{
        findReporteGerenciaService,
        createReporteGerenciaService,
        updateReporteGerenciaService,
        deleteReporteGerenciaService,
        editReporteGerenciaService,
        reporteGerenciaServicecargando,
        reporteGerenciaServices,
        loading,
        createBodegaReporteGerenciaService1
      }}
    >
      {props.children}
    </ReporteGerenciaServiceContext.Provider>
  )
}

export default ReporteGerenciaServiceContextProvider

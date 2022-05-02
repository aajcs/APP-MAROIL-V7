/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { ReporteCargaService } from '../services/ReporteCargaService'
import AuthUse from '../../../auth/AuthUse'
export const ReporteCargaContext = createContext()

const ReporteCargaContextProvider = (props) => {
  const reporteCargaService = new ReporteCargaService()

  const [reporteCargas, setReporteCargas] = useState([])
  const [editReporteCarga, setEditReporteCarga] = useState(null)
  const [loading, setLoading] = useState(true)
  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    reporteCargaService.readAll(token).then((data) => {
      setReporteCargas(data)
      setLoading(false)
    })
  }, [])

  const findReporteCarga = (id) => {
    const reporteCarga = reporteCargas.find((p) => p.id === id)
    setEditReporteCarga(reporteCarga)
  }

  const createReporteCarga = (reporteCarga) => {
    reporteCargaService
      .create(reporteCarga, token)
      .then((data) =>
        setReporteCargas([...reporteCargas, data.saveReporteCarga])
      )
  }

  const updateReporteCarga = (reporteCarga) => {
    reporteCargaService
      .update(reporteCarga, token)
      .then((data) =>
        setReporteCargas(
          reporteCargas.map((p) =>
            p.id === reporteCarga.id ? data.updateReporteCarga : p
          )
        )
      )
    setEditReporteCarga(null)
  }

  const deleteReporteCarga = (id) => {
    reporteCargaService
      .delete(id, token)
      .then(() => setReporteCargas(reporteCargas.filter((p) => p.id !== id)))
  }

  return (
    <ReporteCargaContext.Provider
      value={{
        findReporteCarga,
        createReporteCarga,
        updateReporteCarga,
        deleteReporteCarga,
        editReporteCarga,
        reporteCargas,
        loading
      }}
    >
      {props.children}
    </ReporteCargaContext.Provider>
  )
}

export default ReporteCargaContextProvider

/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { ReporteCargaGOMService } from '../services/ReporteCargaGOMService.js'
import AuthUse from '../../../auth/AuthUse'
export const ReporteCargaGOMContext = createContext()

const ReporteCargaGOMContextProvider = (props) => {
  const reporteCargaGOMService = new ReporteCargaGOMService()

  const [reporteCargaGOMs, setReporteCargaGOMs] = useState([])
  const [editReporteCargaGOM, setEditReporteCargaGOM] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)
  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    reporteCargaGOMService.readAll(token).then((data) => {
      setReporteCargaGOMs(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      reporteCargaGOMService.readAll(token).then((data) => {
        setReporteCargaGOMs(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  const findReporteCargaGOM = (id) => {
    const reporteCargaGOM = reporteCargaGOMs.find((p) => p.id === id)
    setEditReporteCargaGOM(reporteCargaGOM)
  }

  const createReporteCargaGOM = (reporteCargaGOM) => {
    reporteCargaGOMService
      .create(reporteCargaGOM, token)
      .then((data) =>
        setReporteCargaGOMs([...reporteCargaGOMs, data.savenewReporteCargaGOM])
      )
  }

  const updateReporteCargaGOM = (reporteCargaGOM) => {
    reporteCargaGOMService
      .update(reporteCargaGOM, token)
      .then((data) =>
        setReporteCargaGOMs(
          reporteCargaGOMs.map((p) =>
            p.id === reporteCargaGOM.id ? data.updateReporteCargaGOM : p
          )
        )
      )
    setEditReporteCargaGOM(null)
  }

  const deleteReporteCargaGOM = (id) => {
    reporteCargaGOMService
      .delete(id, token)
      .then(() =>
        setReporteCargaGOMs(reporteCargaGOMs.filter((p) => p.id !== id))
      )
  }

  return (
    <ReporteCargaGOMContext.Provider
      value={{
        findReporteCargaGOM,
        createReporteCargaGOM,
        updateReporteCargaGOM,
        deleteReporteCargaGOM,
        editReporteCargaGOM,
        reporteCargaGOMs,
        loading
      }}
    >
      {props.children}
    </ReporteCargaGOMContext.Provider>
  )
}

export default ReporteCargaGOMContextProvider

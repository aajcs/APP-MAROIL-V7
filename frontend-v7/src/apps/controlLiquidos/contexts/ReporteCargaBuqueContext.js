/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { ReporteCargaBuqueService } from '../services/ReporteCargaBuqueService.js'
import AuthUse from '../../../auth/AuthUse.js'
export const ReporteCargaBuqueContext = createContext()

const ReporteCargaBuqueContextProvider = (props) => {
  const reporteCargaBuqueService = new ReporteCargaBuqueService()

  const [reporteCargaBuques, setReporteCargaBuques] = useState([])
  const [editReporteCargaBuque, setEditReporteCargaBuque] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)
  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    reporteCargaBuqueService.readAll(token).then((data) => {
      setReporteCargaBuques(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      reporteCargaBuqueService.readAll(token).then((data) => {
        setReporteCargaBuques(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  const findReporteCargaBuque = (id) => {
    const reporteCargaBuque = reporteCargaBuques.find((p) => p.id === id)
    setEditReporteCargaBuque(reporteCargaBuque)
  }

  const createReporteCargaBuque = (reporteCargaBuque) => {
    reporteCargaBuqueService
      .create(reporteCargaBuque, token)
      .then((data) =>
        setReporteCargaBuques([
          ...reporteCargaBuques,
          data.savenewReporteCargaBuque
        ])
      )
  }

  const updateReporteCargaBuque = (reporteCargaBuque) => {
    reporteCargaBuqueService
      .update(reporteCargaBuque, token)
      .then((data) =>
        setReporteCargaBuques(
          reporteCargaBuques.map((p) =>
            p.id === reporteCargaBuque.id ? data.updateReporteCargaBuque : p
          )
        )
      )
    setEditReporteCargaBuque(null)
  }

  const deleteReporteCargaBuque = (id) => {
    reporteCargaBuqueService
      .delete(id, token)
      .then(() =>
        setReporteCargaBuques(reporteCargaBuques.filter((p) => p.id !== id))
      )
  }

  return (
    <ReporteCargaBuqueContext.Provider
      value={{
        findReporteCargaBuque,
        createReporteCargaBuque,
        updateReporteCargaBuque,
        deleteReporteCargaBuque,
        editReporteCargaBuque,
        reporteCargaBuques,
        loading
      }}
    >
      {props.children}
    </ReporteCargaBuqueContext.Provider>
  )
}

export default ReporteCargaBuqueContextProvider

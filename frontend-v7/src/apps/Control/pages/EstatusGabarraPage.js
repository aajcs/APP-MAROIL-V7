import React from 'react'
import GabarraContextProvider from '../contexts/GabarraContext'
import GabarraEstatusList from '../components/GabarraEstatusList'
import ReporteCargaContextProvider from '../contexts/ReporteCargaContext'
import BarcoContextProvider from '../contexts/BarcoContext'
export const EstatusGabarraPage = () => {
  return (
    <div className="grid">
      <BarcoContextProvider>
        <GabarraContextProvider>
          <ReporteCargaContextProvider>
            <GabarraEstatusList />
          </ReporteCargaContextProvider>
        </GabarraContextProvider>
      </BarcoContextProvider>
    </div>
  )
}

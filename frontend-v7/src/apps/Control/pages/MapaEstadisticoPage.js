import React, { useState } from 'react'
import ReactTooltip from 'react-tooltip'
import MapaEstadisticoList from '../components/MapaEstadisticoList'
import BarcoContextProvider from '../contexts/BarcoContext'
import ReporteCargaGOMContextProvider from '../contexts/ReporteCargaGOMContext'

export const MapaEstadisticoPage = () => {
  const [content, setContent] = useState('')
  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card text-center ">
          <h4>Mapa Estadístico</h4>
          <div>
            <BarcoContextProvider>
              <ReporteCargaGOMContextProvider>
                <MapaEstadisticoList setTooltipContent={setContent} />
                <ReactTooltip>{content}</ReactTooltip>
              </ReporteCargaGOMContextProvider>
            </BarcoContextProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

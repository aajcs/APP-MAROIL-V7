/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Calendar } from 'primereact/calendar'
import { Tag } from 'primereact/tag'
import HomeDashboardTotalMes from './HomeDashboardTotalMes'
import moment from 'moment'

const HomeDashboard = ({ ingresoGastos, centroDeCostoAuxs }) => {
  // console.log(centroDeCostoAuxs)
  const [dateDashboard, setDateDashboard] = useState(moment()._d)

  const ubicacionBuqueTags = {
    'Rail Veyor': '#1473e9b8',
    'MAROIL TERMINAL 2': '#094db1',
    'MAROIL TERMINAL 3': '#094db1',
    'Puesto de Espera (Oeste)': '#094db1',
    'Puesto de Carga (Centro)': '#094db1',
    'Puesto de Carga S.T.S. (Este)': '#094db1',
    'Petro Cedeño': '#b8202e',
    'Petro San Felix': '#70ad47'
  }
  const ubicacionBuqueTag = (value) => {
    return ubicacionBuqueTags[value]
  }
  // const ubicacionBuqueTag = ubicacionBuqueTags[events.terminalBuque]
  return (
    <>
      <div className="card col-2 justify-content-center">
        <Calendar
          value={dateDashboard}
          onChange={(e) => setDateDashboard(e.value)}
          view="month"
          dateFormat="mm/yy"
          showIcon
        />
      </div>
      <div className="formgrid grid  ">
        {centroDeCostoAuxs.map(
          (p) =>
            p.estatusCentroDeCosto === 'OPERATIVO' && (
              <div className="field card col-12 lg:col-12 xl:col-12 ">
                <Tag
                  style={{
                    background: ubicacionBuqueTag(p.descripcionCentroDeCosto)
                  }}
                >
                  <div className="flex align-items-center gap-2">
                    <span className="h4 mb-0">
                      {p.descripcionCentroDeCosto}
                    </span>
                  </div>
                </Tag>
                <HomeDashboardTotalMes
                  key={p.id}
                  centroDeCosto={p}
                  ingresoGastos={ingresoGastos}
                  dateDashboard={dateDashboard}
                />
              </div>
            )
        )}
      </div>
    </>
  )
}

export default HomeDashboard

/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react'
import { BarcoContext } from '../contexts/BarcoContext'
import { ProgressBar } from 'primereact/progressbar'

export default function TotalStatus() {
  const { barcocargando } = useContext(BarcoContext)
  const [barcoPrincipal, setBarcoPrincipal] = useState(null)
  const [reportePrincipal, setReportePrincipal] = useState(null)
  // let [reporteCargaBarcoCargando]= barcocargando.reporteCarga
  // console.log('Render totalstatus',reporteCargaBarcoCargando.toneladas_totales);
  const salirDelPaso = 0
  //  if(reportePrincipal.length !== null) salirDelPaso= reportePrincipal.length

  useEffect(() => {
    if (barcocargando) {
      setBarcoPrincipal(barcocargando)
      setReportePrincipal(barcocargando.reporteCarga)
    }
  }, [barcocargando])

  let nombre = ''
  let capacidad = ''
  let totaltoneladas = ''
  let gabarrascargadas = ''
  let gabarracargando = ''
  let totalgabarracargandotoneladas = ''
  let numerodetrenes = ''
  let porcentajecarga = ''
  if (barcoPrincipal) {
    let tope = reportePrincipal.length - 1
    nombre = barcoPrincipal.nombre
    capacidad = barcoPrincipal.toneladas_capacidad
    totaltoneladas = reportePrincipal[tope].toneladas_totales
    gabarrascargadas = reportePrincipal.length
    gabarracargando = barcoPrincipal.nombre
    totalgabarracargandotoneladas = barcoPrincipal.nombre
    numerodetrenes = barcoPrincipal.nombre
    porcentajecarga = (100 * totaltoneladas) / capacidad
  }
  return (
    <>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Barco</span>
              <div className="text-900 font-medium text-xl">{nombre}</div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-blue-100 border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-cloud-download text-blue-500 text-xl" />
            </div>
          </div>
          <div className="mb-3">
            {' '}
            <span className="text-green-500 font-medium">{capacidad}</span>
            <span className="text-500"> Toneladas Metricas</span>
          </div>
          <span>
            <ProgressBar value={porcentajecarga}></ProgressBar>
          </span>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Estatus</span>
              <div className="text-900 font-medium text-xl">
                {totaltoneladas}
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-orange-100 border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-inbox text-orange-500 text-xl" />
            </div>
          </div>
          <span className="text-green-500 font-medium">
            {gabarrascargadas}{' '}
          </span>
          <span className="text-500">Total Gabarras</span>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Gabarra</span>
              <div className="text-900 font-medium text-xl">Nombre Gabarra</div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-cyan-100 border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-chart-bar text-cyan-500 text-xl" />
            </div>
          </div>
          <span className="text-green-500 font-medium">5 </span>
          <span className="text-500">total Toneladas</span>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Tranes</span>
              <div className="text-900 font-medium text-xl">
                Numero de trenes
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-purple-100 border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-car text-purple-500 text-xl" />
            </div>
          </div>
          <span className="text-green-500 font-medium">54 </span>
          <span className="text-500">Toneladas Aprox</span>
        </div>
      </div>
    </>
  )
}

/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React from 'react'
import moment from 'moment'

function ProgramacionVentanaCard({ events }) {
  console.log(events)
  const consignatarioBuque = {
    MAROIL: '#2600ff',
    'MAROIL PRIORIDAD': '#08afff',
    PDVSA: '#ff0000',
    'PDVSA PRIORIDAD': '#f759ab',
    MANTENIMIENTO: '#797d82'
  }

  const consignatarioBuqueColor = consignatarioBuque[events.buqueCliente]
  const ubicacionBuqueTags = {
    'MAROIL TERMINAL 1': '#094db1',
    'MAROIL TERMINAL 2': '#094db1',
    'MAROIL TERMINAL 3': '#094db1',
    'Puesto de Espera (Oeste)': '#094db1',
    'Puesto de Carga (Centro)': '#094db1',
    'Puesto de Carga S.T.S. (Este)': '#094db1',
    'PETRO CEDENO': '#d9a406',
    'PETRO SAN FELIX': '#157347'
  }

  const ubicacionBuqueTag = ubicacionBuqueTags[events.terminalBuque]

  return (
    // <div className="col-12 lg:col-6 xl:col-3">
    <>
      <div
        className="card Pb-0 border-bottom-0 border-start-0 border-2  mb-0 text-end animate__animated animate__rotateInDownRight animate__slower"
        style={{ 'border-color': ubicacionBuqueTag, padding: 0 }}
      >
        {' '}
        {events.terminalBuque !== 'BUQUES FONDEADOS' && (
          <>
            <span className="mr-2  fst-italic ">
              {events.fechaInicioVentana <= moment().add(1, 'days').format()
                ? events.buqueCliente === 'MANTENIMIENTO'
                  ? 'Mantenimeinto Actual en Ventana'
                  : 'Buque Actual en Ventana'
                : events.buqueCliente === 'MANTENIMIENTO'
                ? 'Mantenimeinto Próximo en Ventana'
                : 'Buque Próximo en Ventana'}
            </span>{' '}
          </>
        )}
      </div>

      <div
        className="card Pb-2 border-top-0 border-end-0 border-2 animate__animated animate__zoomInLeft animate__slower animate__delay-2s"
        style={{ 'border-color': consignatarioBuqueColor }}
      >
        <div className="flex justify-content-between">
          <div>
            <div className="text-900 font-medium text-xl">
              {events.nombreBuque}
            </div>
          </div>
          <div
            className="flex align-items-center justify-content-center  border-round ml-2"
            style={{ height: '2.5rem', 'font-size': '0.8rem' }}
          >
            {new Intl.NumberFormat().format(events.toneladasNominadas)}{' '}
            {' TM / '}
            {events.buqueClienteVenta === 'ENDECO' ||
            events.buqueClienteVenta === 'SUPERIOR QUANTITY SDN BHD' ||
            events.buqueClienteVenta === 'REZEL CATALYSTS' ||
            events.buqueClienteVenta === 'ATLAS OIL' ||
            events.buqueClienteVenta === 'UNECA' ||
            events.buqueClienteVenta === 'INTERNATIONAL MATERIALS' ||
            events.buqueClienteVenta === 'IRAN GARMENT COMPANY'
              ? events.buqueClienteVenta
              : events.buqueCliente}
          </div>
        </div>
        {/* <span className="text-green-500 font-medium">
          <p className=" mb-0">{events.terminalBuque}</p>
        </span> */}
        <span className="text-500">
          {' '}
          {events.terminalBuque !== 'BUQUES FONDEADOS' && (
            <>
              {moment(events.fechaInicioVentana).format('DD-MMMM')} {' => '}{' '}
              {moment(events.fechaFinVentana).format('DD-MMMM')}{' '}
            </>
          )}
        </span>
        <span className="text-end p-0"></span>
      </div>
    </>
    // </div>
  )
}

export default ProgramacionVentanaCard

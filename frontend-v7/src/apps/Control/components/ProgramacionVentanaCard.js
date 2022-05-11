/* eslint-disable react/prop-types */
import React from 'react'
import moment from 'moment'

function ProgramacionVentanaCard({ events }) {
  console.log(events)
  return (
    // <div className="col-12 lg:col-6 xl:col-3">
    <div className="card mb-0 border-top-0 border-end-0  border-danger  border-2 ">
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
          {new Intl.NumberFormat().format(events.toneladasNominadas)} {' TM / '}{' '}
          {events.buqueCliente}
        </div>
      </div>
      {/* <span className="text-green-500 font-medium">
          <p className=" mb-0">{events.terminalBuque}</p>
        </span> */}
      <span className="text-500">
        {' '}
        {moment(events.fechaInicioVentana).format('DD-MMMM')} {' => '}{' '}
        {moment(events.fechaFinVentana).format('DD-MMMM')}{' '}
      </span>
      <span className="text-end p-0"></span>
    </div>
    // </div>
  )
}

export default ProgramacionVentanaCard

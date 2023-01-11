/* eslint-disable indent */
/* eslint-disable react/prop-types */

// import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Tag } from 'primereact/tag'

import AuthUse from '../../../auth/AuthUse'

function GastosOperacionaleCard({ gastosOperacionales }) {
  const auth = AuthUse()

  // const fecha4 = fecha2.diff(fecha1, 'days')

  return (
    <div className="col-12 lg:col-6 xl:col-6">
      <div className="card mt-2 mb-0 pb-0 ">
        <div className="card-body p-0">
          <div className="grid ">
            <div className="col-6">
              <h3 className=" card-title mb-0">
                {gastosOperacionales.nombreGastosOperacionale}
              </h3>{' '}
              <h6 className="text-400 card-title mt-0">
                {gastosOperacionales.descripcionGastosOperacionale}
              </h6>
            </div>
            <div className="col-6 text-right ">
              <Tag
                className="w-100 p-2 text-900"
                style={{
                  'box-shadow':
                    gastosOperacionales.estatusGastosOperacionale === 'APROBADO'
                      ? '0px 6px 20px rgb(0 222 99 / 30%)'
                      : gastosOperacionales.estatusGastosOperacionale ===
                        'INICIADO'
                      ? '0px 6px 20px rgb(0 109 222 / 30%)'
                      : '0px 6px 20px rgb(222 0 92 / 30%)',
                  fontSize: '12px',
                  background:
                    gastosOperacionales.estatusGastosOperacionale === 'APROBADO'
                      ? '#157347'
                      : gastosOperacionales.estatusGastosOperacionale ===
                        'INICIADO'
                      ? '#094db1'
                      : '#97101d'
                }}
              >
                <p className=" mb-0">
                  {gastosOperacionales.estatusGastosOperacionale}
                </p>
              </Tag>
              {auth.isLogged() && auth.user.faidUser.roles[0] !== 'LECTURA' && (
                <span className="text-sm text-400">
                  Act.
                  {moment(gastosOperacionales.updatedAt).isValid() &&
                    moment(gastosOperacionales.updatedAt).format(
                      'DD/MM HH:mm'
                    )}{' '}
                </span>
              )}
            </div>
          </div>
          <h6 className="card-text mt-0 mb-2">
            Viaje Asociado:
            <span className=" font-medium">
              {' '}
              {gastosOperacionales.viaje &&
                gastosOperacionales.viaje.nombreViaje}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Embarcacion Asociada:
            <span className=" font-medium">
              {' '}
              {gastosOperacionales.embarcacion &&
                gastosOperacionales.embarcacion.nombreEmbarcacion}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Remolcador Asociado:
            <span className=" font-medium">
              {' '}
              {gastosOperacionales.remolcador &&
                gastosOperacionales.remolcador.nombreRemolcador}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Fecha Del Gasto:
            <span className=" font-medium">
              {' '}
              {moment(gastosOperacionales.fechaGastosOperacionale).isValid() &&
                moment(gastosOperacionales.fechaGastosOperacionale).format(
                  'dddDD/MM/YY HH:mm'
                )}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Monto del Gasto:
            <span className=" font-medium">
              {' '}
              {new Intl.NumberFormat().format(
                gastosOperacionales.montoGastosOperacionale
              )}
              {' $'}
            </span>
          </h6>
        </div>
      </div>
    </div>
  )
}

export default GastosOperacionaleCard

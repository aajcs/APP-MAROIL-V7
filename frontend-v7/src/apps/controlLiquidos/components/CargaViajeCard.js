/* eslint-disable indent */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Tag } from 'primereact/tag'
import { ProgressBar } from 'primereact/progressbar'

import AuthUse from '../../../auth/AuthUse'
import cargaViajeesJPEG from '../assetsControlLiquidos/ImagenesTodas'
console.log(cargaViajeesJPEG)
function CargaViajeCard({ cargaViajes }) {
  const [porcentajeCombustible, setPorcentajeCombustible] = useState(0)

  const auth = AuthUse()
  const fecha1 = moment(cargaViajes.fechaArriboCargaViaje)
  const fecha2 = moment(
    cargaViajes.fechaZarpeCargaViaje
      ? cargaViajes.fechaZarpeCargaViaje
      : moment()
  )
  const fecha3 = moment(
    cargaViajes.fechaCompletacionCargaViaje
      ? cargaViajes.fechaCompletacionCargaViaje
      : moment()
  )

  // const fecha3 = moment(fecha1 - fecha2).format('HH:mm')

  // Diff in hours
  const diff = fecha2.diff(fecha1, 'seconds')
  const diff2 = fecha3.diff(fecha1, 'seconds')

  // const fecha4 = fecha2.diff(fecha1, 'days')
  useEffect(() => {
    const handlesumar = () => {
      if (cargaViajes.catidadActualCargaViaje) {
        const porcentaje =
          (100 * cargaViajes.catidadPruductoCargaViaje) /
          cargaViajes.catidadActualCargaViaje
        setPorcentajeCombustible(porcentaje.toFixed(2))
      }
    }

    handlesumar()
  }, [])
  function secondsToString(diff) {
    const numdays = Math.floor(diff / 86400)
    const numhours = Math.floor((diff % 86400) / 3600)
    const numminutes = Math.floor(((diff % 86400) % 3600) / 60)
    // const numseconds = ((diff % 86400) % 3600) % 60

    return numdays + ' dias ' + numhours + ' horas ' + numminutes + ' minutos '
  }
  return (
    <div className="col-12 lg:col-6 xl:col-6">
      <div className="">
        <div
          className={
            cargaViajes.estatusCargaViaje === 'INICIADO' &&
            cargaViajes.tipoCargaViaje === 'CARGANDO'
              ? 'card mt-2 mb-0 pb-0 border border-success'
              : cargaViajes.estatusCargaViaje === 'INICIADO' &&
                cargaViajes.tipoCargaViaje === 'DESCARGANDO'
              ? 'card mt-2 mb-0 pb-0 border border-primary'
              : 'card mt-2 mb-0 pb-0 border border-danger'
          }
        >
          <div className="card-body p-0">
            <div className="grid ">
              <div className="col-6 ">
                <h3 className=" card-title mb-0">
                  {cargaViajes.puertoCargaViaje}
                </h3>{' '}
                <h6 className="text-400 card-title mt-0">
                  {cargaViajes.productoCargaViaje}
                </h6>
              </div>
              <div className="col-6 text-right ">
                <Tag
                  className="w-100 p-2 text-800 font-bold"
                  style={{
                    'box-shadow':
                      cargaViajes.estatusCargaViaje === 'INICIADO' &&
                      cargaViajes.tipoCargaViaje === 'CARGANDO'
                        ? '0px 6px 20px rgb(0 222 99 / 30%)'
                        : cargaViajes.estatusCargaViaje === 'INICIADO' &&
                          cargaViajes.tipoCargaViaje === 'DESCARGANDO'
                        ? '0px 6px 20px rgb(0 109 222 / 30%)'
                        : '0px 6px 20px rgb(222 0 92 / 30%)',
                    fontSize: '12px',
                    background:
                      cargaViajes.estatusCargaViaje === 'INICIADO' &&
                      cargaViajes.tipoCargaViaje === 'CARGANDO'
                        ? '#157347'
                        : cargaViajes.estatusCargaViaje === 'INICIADO' &&
                          cargaViajes.tipoCargaViaje === 'DESCARGANDO'
                        ? '#094db1'
                        : '#97101d'
                  }}
                >
                  <p className=" mb-0">
                    {cargaViajes.tipoCargaViaje === 'CARGANDO'
                      ? 'CARGA'
                      : 'DESCARGA'}{' '}
                    {cargaViajes.estatusCargaViaje === 'INICIADO'
                      ? 'INICIADA'
                      : 'FINALIZADA'}
                  </p>
                </Tag>
                {auth.isLogged() && auth.user.faidUser.roles[0] !== 'LECTURA' && (
                  <span className="text-sm text-400">
                    Act.
                    {moment(cargaViajes.updatedAt).isValid() &&
                      moment(cargaViajes.updatedAt).format('DD/MM HH:mm')}{' '}
                  </span>
                )}
              </div>
            </div>
            <div className="grid ">
              <div
                className="col-6 text-left "
                // onClick={() => onClick('displayDetalleCarga')}
              >
                <h6 className="card-text mt-0 mb-2">
                  Fecha Arribo:
                  <span className="text-green-500 font-medium">
                    {' '}
                    {moment(cargaViajes.fechaArriboCargaViaje).isValid() &&
                      moment(cargaViajes.fechaArriboCargaViaje).format(
                        'dddDD/MM/YY HH:mm'
                      )}
                  </span>
                </h6>
                <h6 className="card-text mt-0 mb-2">
                  Fecha fin Carga:
                  <span className="text-yellow-500 font-medium">
                    {' '}
                    {moment(
                      cargaViajes.fechaCompletacionCargaViaje
                    ).isValid() &&
                      moment(cargaViajes.fechaCompletacionCargaViaje).format(
                        'dddDD/MM/YY HH:mm'
                      )}
                  </span>
                </h6>
                <h6 className="card-text mt-0 mb-2">
                  Fecha Zarpe:
                  <span className="text-orange-500 font-medium">
                    {' '}
                    {moment(cargaViajes.fechaZarpeCargaViaje).isValid() &&
                      moment(cargaViajes.fechaZarpeCargaViaje).format(
                        'dddDD/MM/YY HH:mm'
                      )}
                  </span>
                </h6>
              </div>
              <div className="col-6 text-left ">
                <h6 className="card-text mt-0 mb-2">
                  Volumen Total:
                  <span className=" font-medium">
                    {' '}
                    {new Intl.NumberFormat().format(
                      cargaViajes.catidadPruductoCargaViaje
                    )}
                    {' Bbls'}
                  </span>
                </h6>
                <h6 className="card-text mt-0 mb-2">
                  Volumen Actual:
                  <span className=" font-medium">
                    {' '}
                    {new Intl.NumberFormat().format(
                      cargaViajes.catidadActualCargaViaje
                    )}
                    {' Bbls'}
                  </span>
                </h6>
                <h6 className="card-text mt-0 mb-2">
                  Rata de{' '}
                  {cargaViajes.tipoCargaViaje === 'CARGANDO'
                    ? 'Carga'
                    : 'Descarga'}{' '}
                  :
                  <span className=" font-medium">
                    {' '}
                    {new Intl.NumberFormat()
                      .format(cargaViajes.rataCargaViaje)
                      .charAt(0)
                      .toUpperCase()}
                    {' Bbls/h'}
                  </span>
                </h6>
              </div>
            </div>
            <hr className="mt-2 mb-2 " />
            <div className="grid ">
              <div
                className="col-6 text-center "
                // onClick={() => onClick('displayDetalleCarga')}
              >
                <h6 className="text-center  m-1">
                  Tiempo de Carga {secondsToString(diff)}
                </h6>{' '}
                <h6 className="text-center  m-1">
                  Tiempo de Puerto {secondsToString(diff2)}
                </h6>{' '}
                {/* <BarChartDemo
                heightBogega="50px"
                bodegasDelBarco={bodegasDelBarco}
                barcos={barcos}
              /> */}
              </div>
              <div className="col-6 text-right ">
                <h6 className="text-center">Porcentaje de Carga</h6>
                <ProgressBar
                  className="mt-2 mb-3 "
                  color={porcentajeCombustible > 10 ? '#198754' : '#ff0000'}
                  value={porcentajeCombustible}
                ></ProgressBar>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CargaViajeCard
